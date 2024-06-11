const cameraVideoStream = document.getElementById("camera-stream");
const shutterButton = document.getElementById("shutter");
const canvas = document.getElementById("canvas");

if (
  navigator.mediaDevices &&
  navigator.mediaDevices.getUserMedia({ video: true })
) {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    cameraVideoStream.srcObject = stream;
    cameraVideoStream.play();
  });
}

let width = window.innerWidth;
let height = 0;
let streaming = false;

cameraVideoStream.addEventListener(
  "canplay",
  (ev) => {
    if (!streaming) {
      height =
        cameraVideoStream.videoHeight / (cameraVideoStream.videoWidth / width);

      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      cameraVideoStream.setAttribute("width", width);
      cameraVideoStream.setAttribute("height", height);
      streaming = true;
    }
  },
  false
);

// Capture snapshots using HTML Canvas
function captureImage() {
  const canvasContext = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  canvasContext.drawImage(cameraVideoStream, 0, 0, width, height);

  // Convert captured data to image (base64)
  const data = canvas.toDataURL("image/png");
  currentImageElement.src = data;
}

// Add click listener to shutter button to capture image
shutterButton.addEventListener("click", () => captureImage());
