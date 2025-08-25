import os
import pickle
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from utils import load_model, predict_hate_speech

load_dotenv()
app = Flask(__name__)
CORS(app)

# Load the hate speech model on startup
MODEL_PATH = os.getenv('MODEL_PATH', 'models/hate_speech_model.pkl')
try:
    model = load_model(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Accept both 'text' and 'input' for backward compatibility
        text = data.get('text') or data.get('input')
        if not text:
            return jsonify({'error': 'Missing text data'}), 400
        
        text = str(text).strip()
        if not text:
            return jsonify({'error': 'Empty text provided'}), 400
        
        # Get prediction from model
        prediction, confidence = predict_hate_speech(model, text)
        
        return jsonify({
            'text': text,
            'prediction': prediction,
            'confidence': float(confidence),
            'is_hate_speech': prediction == 'hate_speech'
        })
        
    except Exception as e:
        print(f"Error in predict endpoint: {e}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)