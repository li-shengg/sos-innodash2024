const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const takePhotoButton = document.getElementById("take-photo");
const loadingScreen = document.getElementById("loading-screen");
const confirmScreen = document.getElementById("confirm-screen");
const capturedImage = document.getElementById("captured-image");
const capturedPlate = document.getElementById("captured-plate");

const constraints = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user",
  },
};

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    webcamElement.srcObject = stream;
    console.log("Webcam started");
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
  const downloadLink = document.createElement("a");
  downloadLink.href = picture;
  downloadLink.download = "selfie.png";
  downloadLink.textContent = "Download Photo";
  document.body.appendChild(downloadLink);
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
      //Dipay the captured carplate
      capturedPlate.innerText = responseData;
    } else if (responseStatus == 400) {
      console.log(responseData);
    } else {
      console.log("Ai has failed");
    }
  };

  fetchMethod(currentUrl + `/api/AI_classify`, callbackForAi, "POST", data);
});
