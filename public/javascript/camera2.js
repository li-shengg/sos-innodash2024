import { funcall } from './AI_Model4.js'; // Import the funcall function from AI_Model4.js

const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const takePhotoButton = document.getElementById('take-photo');

const constraints = {
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
    }
};

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        webcamElement.srcObject = stream;
        console.log("Webcam started");
    } catch (err) {
        console.error(err);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'alert alert-danger';
        errorMsg.innerHTML = `
            Failed to start camera. Please allow permission to access the camera.<br>
            If you are browsing through social media built-in browsers, you would need to open the page in Safari (iPhone) / Chrome (Android).
        `;
        document.body.appendChild(errorMsg);
    }
}

window.onload = startWebcam;

takePhotoButton.addEventListener('click', () => {
    const context = canvasElement.getContext('2d');
    canvasElement.width = webcamElement.videoWidth;
    canvasElement.height = webcamElement.videoHeight;
    context.drawImage(webcamElement, 0, 0, canvasElement.width, canvasElement.height);

    const picture = canvasElement.toDataURL('image/png');
    console.log("Picture taken");

    const downloadLink = document.createElement('a');
    downloadLink.href = picture;
    downloadLink.download = 'selfie.png';
    downloadLink.textContent = 'Download Photo';
    document.body.appendChild(downloadLink);
    const base64_string = picture.split(',')[1];
    funcall(base64_string); // Call the funcall function from AI_Model4.js
});
