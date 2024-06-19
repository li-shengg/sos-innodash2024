base64_string=""
import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import vertexai.preview.generative_models as generative_models
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials

key_path="lunar-parsec-417813-9b4958f8545d.json"

credentials=Credentials.from_service_account_file(
    key_path
)

if credentials.expired:
    credentials.refresh(Request())


def generate(base64_string):
  vertexai.init(project="lunar-parsec-417813", location="us-central1",credentials=credentials)
  model = GenerativeModel(
    "gemini-1.5-flash-001",
  )
  image1 = Part.from_data(
    mime_type="image/jpeg",
    data=base64.b64decode(base64_string))
  
  responses = model.generate_content(
      [image1, """Read the text in this image."""],
      generation_config=generation_config,
      safety_settings=safety_settings,
      stream=True,
  )

  for response in responses:
    print(response.text, end="")



generation_config = {
    "max_output_tokens": 8192,
    "temperature": 1,
    "top_p": 0.95,
}

safety_settings = {
    generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
}

generate(base64_string)

