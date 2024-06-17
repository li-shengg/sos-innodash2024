const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
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

    snapSoundElement.play();

    const picture = canvasElement.toDataURL('image/png');
    console.log("Picture taken");

    const downloadLink = document.createElement('a');
    downloadLink.href = picture;
    downloadLink.download = 'selfie.png';
    downloadLink.textContent = 'Download Photo';
    document.body.appendChild(downloadLink);
    var base64_string=downloadLink.href
    base64_string = base64_string.split(',')[1]
    console.log(base64_string)
});
