import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import pandas as pd
from sqlalchemy import text
from tensorflow.python import keras
from database import init_app, db
from models import Comment
app = Flask(__name__)
CORS(app)
init_app(app)
df = pd.read_csv(os.path.join('../data','train.csv', 'train.csv'))
df=df.head(16000)
X = df['comment_text']

MAX_FEATURES = 20000
SEQUENCE_LENGTH = 1800
vectorizer = tf.keras.layers.TextVectorization(
    max_tokens=MAX_FEATURES,
    output_sequence_length=SEQUENCE_LENGTH,
    output_mode='int'
)
vectorizer.adapt(X.values)
# Load model and vectorizer
model = tf.keras.models.load_model('../toxicity.keras')



def score_comment(comment):
    vectorized_comment = vectorizer([comment])
    results = model.predict(vectorized_comment)

    response = {}
    for idx, col in enumerate(['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']):
        response[col] = bool(results[0][idx] > 0.5)
    return response


@app.route('/add_comment', methods=['POST'])
def add_comment():
    data = request.json
    # print(data['image'])
    try:
        toxic_scores = score_comment(data['content'])
        # print(data['content'])
        if any(toxic_scores.values()):
            return jsonify({
                "error": "Your comment contains toxic content and cannot be added.",
                "details": toxic_scores
            }), 400

        image_data = data.get('image') or b''

        new_comment = Comment(
            productId=data['productId'],
            content=data['content'],
            image=image_data,
            userId=data['userId'],
            star=data['star'],
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({
            "errCode": 0,
            "msg": "Comment added successfully!",
            "data": [new_comment.to_dict()] 
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True,port=3001)
