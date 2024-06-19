const Tesseract = require('tesseract.js');

// Function to recognize text from a base64 image string
async function recognizeLicensePlate(base64String) {
  try {
    const result = await Tesseract.recognize(
      `data:image/jpeg;base64,${base64String}`,
      'eng+osd', // Specify 'eng+osd' for English language and OSD module
      {
        logger: (e) => console.log(e),
        whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // Allowed characters
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' // Only letters allowed for plate segments
      }
    );
    const text = result.data.text.replace(/\s/g, ''); // Remove any whitespace characters
    if (text.length === 8 && text[3] === ',') {
      console.log('License Plate:', text);
      const segments = text.split(',');
      const firstSegment = segments[0];
      const secondSegment = segments[1];
      const thirdSegment = segments[2];
      console.log('First Segment:', firstSegment);
      console.log('Second Segment:', secondSegment);
      console.log('Third Segment:', thirdSegment);
    } else {
      console.log('Invalid License Plate format:', text);
    }
  } catch (err) {
    console.error('Error recognizing license plate:', err);
  }
}

// Example usage
recognizeLicensePlate(base64String);