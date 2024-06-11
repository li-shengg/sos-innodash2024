const { exec } = require('child_process');

function predictjson(callback) {
    const pythonScriptPath = 'AI_Model2.py'; // Update with the actual path
    const command = `python ${pythonScriptPath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            callback(error, null);
        } else {
            callback(null, stdout.trim());
        }
    });
}

predictjson((err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Result:', result);
    }
});