import base64
import requests
from google.cloud import aiplatform
from google.oauth2.service_account import Credentials
from google.auth.transport.requests import Request
import os

# Get the directory of the current script
current_dir = os.path.dirname(__file__)

# Construct the path to the key file relative to the current script
key_path = os.path.join(current_dir, '../AI_Model/lunar-parsec-417813-9b4958f8545d.json')

# Normalize the path
key_path = os.path.normpath(key_path)


def predict_from_url(
    image_url: str,
    key_path=key_path,
    project: str = "372352180346",
    endpoint_id: str = "962774162722521088",
    location: str = "us-central1",
    api_endpoint: str = "us-central1-aiplatform.googleapis.com",
):

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = key_path

    credentials = Credentials.from_service_account_file(key_path)

    if credentials.expired:
        credentials.refresh(Request())

    aiplatform.init(
        project=project,
        location=location,
        credentials=credentials
    )

    client_options = {"api_endpoint": api_endpoint}
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)

    # Fetch image content from the URL
    response = requests.get(image_url)
    if response.status_code != 200:
        raise ValueError("Failed to fetch image from the provided URL.")

    file_content = response.content

    encoded_content = base64.b64encode(file_content).decode("utf-8")
    instance = aiplatform.gapic.schema.predict.instance.ImageClassificationPredictionInstance(
        content=encoded_content,
    ).to_value()
    instances = [instance]

    parameters = aiplatform.gapic.schema.predict.params.ImageClassificationPredictionParams(
        confidence_threshold=0.4,
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

    predictions = response.predictions
    for prediction in predictions:
        print(" prediction:", dict(prediction))

# Make a prediction using the predict_from_url function with a sample image URL
predict_from_url(
    image_url="https://tse3.mm.bing.net/th?id=OIP.A82KyPwxm--kQzdzDVVnIwHaEK&pid=Api&P=0&h=180"
)
