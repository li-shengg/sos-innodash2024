import { funcall } from './AI_Model4.js';
const takePhotoButton = document.getElementById('take-photo');

takePhotoButton.addEventListener('click', () => {
    const base64_string = document.getElementById('base64_string');
    if (base64_string) {
        console.log("We made it")
    } else {
        console.log('base64_string not found.');
    }
});


