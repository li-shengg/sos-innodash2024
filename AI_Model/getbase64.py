import base64

# Define the file path
file_path ='descarga-89-_jpeg_jpg.rf.885415b610869fdae91c2ce142ace0b6.jpg'

# Read the image file in binary mode
with open(file_path, 'rb') as image_file:
    # Encode the image to base64
    base64_encoded_str = base64.b64encode(image_file.read()).decode('utf-8')

print(base64_encoded_str)