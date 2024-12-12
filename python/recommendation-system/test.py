import os
from flask import Flask, request, jsonify
import base64
import pickle
import tensorflow as tf
import numpy as np
from numpy.linalg import norm
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
import cv2
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)
# Load precomputed feature list and filenames
feature_list = np.array(pickle.load(open('embeddings.pkl','rb')))
filenames = pickle.load(open('filenames.pkl','rb'))

# Initialize the ResNet50 model
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224,224,3))
model.trainable = False
model = tf.keras.Sequential([model, GlobalMaxPooling2D()])

# Setup NearestNeighbors
neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
neighbors.fit(feature_list)

def decode_base64_image(base64_str):
    if base64_str.startswith("data:image"):
        header, base64_str = base64_str.split(",", 1)
    img_data = base64.b64decode(base64_str)
    img_array = np.frombuffer(img_data, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    return img

def encode_image_to_base64(image_path):
    """Converts an image to a base64-encoded string."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    base64_image = data.get('image')  # Expecting base64 encoded image string

    if not base64_image:
        return jsonify({"error": "No image provided"}), 400

    input_image = decode_base64_image(base64_image)

    # Resize and preprocess image
    img_resized = cv2.resize(input_image, (224, 224))
    img_array = np.expand_dims(img_resized, axis=0)
    preprocessed_img = preprocess_input(img_array)

    # Get feature vector for the input image
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)

    # Find nearest neighbors
    distances, indices = neighbors.kneighbors([normalized_result])

    # Prepare the result as a list of base64 encoded images
    similar_images_base64 = []
    for file in indices[0][1:6]:  # Skipping the first index since it is the input image itself
        image_path = filenames[file]
        base64_image = encode_image_to_base64(image_path)
        similar_images_base64.append({"image":f"data:image/jpeg;base64,{base64_image}"})

    return jsonify({"similar_images": similar_images_base64})

if __name__ == '__main__':
    app.run(debug=True,port=8080)
