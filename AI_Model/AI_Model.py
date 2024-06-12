from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials

key_path="lunar-parsec-417813-9b4958f8545d.json"

credentials=Credentials.from_service_account_file(
    key_path

)

if credentials.expired:
    credentials.refresh(Request())


PROJECT_ID = 'lunar-parsec-417813'
REGION='us-central1'

import base64
from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./AI_Model/lunar-parsec-417813-9b4958f8545d.json"


aiplatform.init(project=PROJECT_ID,
              location=REGION,
              credentials=credentials)


def predict_image_classification_sample(
    project: str,
    endpoint_id: str,
    filename: str,
    location: str = "us-central1",
    api_endpoint: str = "us-central1-aiplatform.googleapis.com",
):
    # The AI Platform services require regional API endpoints.
    client_options = {"api_endpoint": api_endpoint}
    # Initialize client that will be used to create and send requests.
    # This client only needs to be created once, and can be reused for multiple requests.
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
    with open(filename, "rb") as f:
        file_content = f.read()

    # The format of each instance should conform to the deployed model's prediction input schema.
    encoded_content = base64.b64encode(file_content).decode("utf-8")
    instance = predict.instance.ImageClassificationPredictionInstance(
        content=encoded_content,
    ).to_value()
    instances = [instance]
    # See gs://google-cloud-aiplatform/schema/predict/params/image_classification_1.0.0.yaml for the format of the parameters.
    parameters = predict.params.ImageClassificationPredictionParams(
        confidence_threshold=0.5,
        max_predictions=5,
    ).to_value()
    endpoint = client.endpoint_path(
        project=project, location=location, endpoint=endpoint_id
    )
    response = client.predict(
        endpoint=endpoint, instances=instances, parameters=parameters
    )
    print("response")
    print(" deployed_model_id:", response.deployed_model_id)
    # See gs://google-cloud-aiplatform/schema/predict/prediction/image_classification_1.0.0.yaml for the format of the predictions.
    predictions = response.predictions
    for prediction in predictions:
        print(" prediction:", dict(prediction))


# # [END aiplatform_predict_image_classification_sample]


# prediction
predict_image_classification_sample(
    project="372352180346",
    endpoint_id="962774162722521088",
    location="us-central1",
    filename="descarga-89-_jpeg_jpg.rf.885415b610869fdae91c2ce142ace0b6.jpg"
)