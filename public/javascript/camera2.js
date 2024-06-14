const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const takePhotoButton = document.getElementById('shutter');

const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

window.onload = function() {
    webcam.start()
        .then(result => {
            console.log("Webcam started");
        })
        .catch(err => {
            console.error(err);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'alert alert-danger';
            errorMsg.innerHTML = `
                Failed to start camera. Please allow permission to access the camera.<br>
                If you are browsing through social media built-in browsers, you would need to open the page in Safari (iPhone) / Chrome (Android).
            `;
            document.body.appendChild(errorMsg);
        });
};

takePhotoButton.addEventListener('click', () => {
    const picture = webcam.snap();
    console.log("Picture taken");
    const downloadLink = document.createElement('a');
    downloadLink.href = picture;
    downloadLink.download = 'selfie.png';
    downloadLink.textContent = 'Download Photo';
    document.body.appendChild(downloadLink);
});
