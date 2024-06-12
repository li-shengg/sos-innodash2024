const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const { PredictionServiceClient } = require('@google-cloud/aiplatform').v1;
const { ImageClassificationPredictionInstance, ImageClassificationPredictionParams } = require('@google-cloud/aiplatform').protos.google.cloud.aiplatform.v1.schema.predict;
const fs = require('fs');
const path = require('path');
const base64 = require('base64-js');

// Initialize the Google Auth library
const keyPath = path.join(__dirname, '../AI_Model/lunar-parsec-417813-9b4958f8545d.json');
const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

async function main() {
    const credentials = await auth.getClient();

    if (credentials.expired) {
        await credentials.refresh();
    }

    const PROJECT_ID = 'lunar-parsec-417813';
    const REGION = 'us-central1';

    process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

    const aiplatform = new PredictionServiceClient({
        projectId: PROJECT_ID,
        keyFilename: keyPath,
    });

    async function predictImageClassificationSample(project, endpointId, filename, location = 'us-central1', apiEndpoint = 'us-central1-aiplatform.googleapis.com') {
        // The AI Platform services require regional API endpoints.
        const clientOptions = { apiEndpoint: apiEndpoint };

        // Initialize client that will be used to create and send requests.
        const client = new PredictionServiceClient(clientOptions);

        const fileContent = fs.readFileSync(filename);
        const encodedContent = base64.fromByteArray(new Uint8Array(fileContent)).toString('utf-8');

        const instance = ImageClassificationPredictionInstance.create({
            content: encodedContent,
        });

        const instances = [instance];
        const parameters = ImageClassificationPredictionParams.create({
            confidenceThreshold: 0.5,
            maxPredictions: 5,
        });

        const endpoint = client.endpointPath({
            project: project,
            location: location,
            endpoint: endpointId,
        });

        const request = {
            endpoint: endpoint,
            instances: instances,
            parameters: parameters,
        };

        const [response] = await client.predict(request);

        console.log('response');
        console.log('deployed_model_id:', response.deployedModelId);

        const predictions = response.predictions;
        for (const prediction of predictions) {
            console.log('prediction:', prediction.toObject());
        }
    }

    // Predict
    predictImageClassificationSample(
        '372352180346',
        '962774162722521088',
        path.join(__dirname, 'descarga-89-_jpeg_jpg.rf.885415b610869fdae91c2ce142ace0b6.jpg')
    );
}

main().catch(console.error);
