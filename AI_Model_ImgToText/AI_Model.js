const { exec } = require('child_process');
const path = require('path');

function predictjson(callback) {
    const pythonScriptPath = path.join(__dirname, 'AI_Model.py');
    const command = `python "${pythonScriptPath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error.message}`);
            callback(error, null);
            return;
        }
        if (stderr) {
            console.error(`Python stderr: ${stderr}`);
        }
        callback(null, stdout.trim());
    });
}

predictjson((err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Result:', result);
    }
});
