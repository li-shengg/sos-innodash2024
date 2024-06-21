const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const takePhotoButton = document.getElementById("take-photo");
const loadingScreen = document.getElementById("loading-screen");
const confirmScreen = document.getElementById("confirm-screen");
const capturedImage = document.getElementById("captured-image");
const capturedPlate = document.getElementById("captured-plate");
const capturedType = document.getElementById("captured-type");
const downloadButton = document.getElementById("downloadButton");
const retakeButton = document.getElementById("retakeButton");
const usePhotoButton = document.getElementById("usePhotoButton");
const flipCameraButton = document.getElementById("flipCameraButton");
//Default: Loading screen

const constraints = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user",
  },
};

let currentStream;

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    currentStream = stream; // Store the current stream globally
    webcamElement.srcObject = stream;
    console.log("Webcam started");
    //Remove loading screen      
    loadingScreen.classList.add("d-none");

    // Add event listener to flip camera button
    flipCameraButton.addEventListener("click", flipCamera);
  } catch (err) {
    console.error(err);
    const errorMsg = document.createElement("div");
    errorMsg.className = "alert alert-danger";
    errorMsg.innerHTML = `
            Failed to start camera. Please allow permission to access the camera.<br>
            If you are browsing through social media built-in browsers, you would need to open the page in Safari (iPhone) / Chrome (Android).
        `;
    document.body.appendChild(errorMsg);
  }
}

window.onload = startWebcam;

document.getElementById("back-button").addEventListener("click", (event) => {
  event.preventDefault();
  loadingScreen.classList.add("d-none");
  confirmScreen.classList.add("d-none");
});

retakeButton.addEventListener("click", (event) => {
  event.preventDefault();
  loadingScreen.classList.add("d-none");
  confirmScreen.classList.add("d-none");
});

takePhotoButton.addEventListener("click", async () => {
  const context = canvasElement.getContext("2d");

  //Display screens
  loadingScreen.classList.remove("d-none");
  confirmScreen.classList.add("d-none");

  canvasElement.width = webcamElement.videoWidth;
  canvasElement.height = webcamElement.videoHeight;
  context.drawImage(
    webcamElement,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  const picture = canvasElement.toDataURL("image/png");
  console.log("Picture taken");
  downloadButton.href = picture;
  downloadButton.download = "selfie.png";
  downloadButton.textContent = "Download Photo";
  var base64_String = picture.split(",")[1];

  //Set the captured image
  capturedImage.src = picture;

  //Callback for AI
  const data = {
    base64_String: base64_String,
  };
  console.log(data);

  const callbackForAi = (responseStatus, responseData) => {
    loadingScreen.classList.add("d-none");
    confirmScreen.classList.remove("d-none");

    if (responseStatus == 200) {
      console.log(responseData);

      const objectData = JSON.parse(responseData);
      const keys = Object.keys(objectData);
      const carType = keys[0];
      const carPlate = keys[1];

      capturedPlate.innerText = objectData[carPlate];
      capturedType.innerText = objectData[carType];

      localStorage.setItem("predictedCarPlate", objectData[carPlate]);
      localStorage.setItem("predictedCarType", objectData[carType]);

      console.log(objectData);
    } else if (responseStatus == 400) {
      console.log(responseData);
    } else {
      console.log("Ai has failed");
    }
  };

  fetchMethod(currentUrl + `/api/AI_identify`, callbackForAi, "POST", data);
});

usePhotoButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "confirmation.html";
});

// Function to flip the camera
async function flipCamera() {
  try {
    // Get all video input devices
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    // Log all camera devices found
    console.log("Video devices found:", videoDevices);

    // Check if the current video track exists
    let currentVideoTrack = currentStream ? currentStream.getVideoTracks()[0] : null;

    // Find the back camera
    let nextDeviceId = videoDevices.find(
      (device) => device.label.toLowerCase().includes("back")
    );

    // If no back camera is found, use the next available device
    if (!nextDeviceId) {
      nextDeviceId = videoDevices.find(
        (device) => !currentVideoTrack || device.deviceId !== currentVideoTrack.deviceId
      );
    }

    // If no other camera device is found, log a warning and return
    if (!nextDeviceId) {
      console.warn("No other camera device found.");
      return;
    }

    // Stop the current video track if it exists
    if (currentVideoTrack) {
      currentVideoTrack.stop();
    }

    // Get constraints for the new camera
    const newConstraints = {
      video: {
        deviceId: { exact: nextDeviceId.deviceId },
      },
    };

    // Start new stream with the flipped camera
    const newStream = await navigator.mediaDevices.getUserMedia(newConstraints);
    currentStream = newStream; // Update current stream

    // Update video element with new stream
    webcamElement.srcObject = newStream;
  } catch (error) {
    console.error("Error flipping camera:", error);
  }
}

