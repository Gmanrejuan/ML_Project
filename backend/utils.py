import pickle
import joblib
import re
import numpy as np

def load_model(path):
    """Load the model from the given path using joblib (preferred for sklearn models)"""
    try:
        # Try joblib first (recommended for sklearn models)
        return joblib.load(path)
    except:
        # Fallback to pickle
        with open(path, 'rb') as f:
            return pickle.load(f)

def predict(model, input_data):
    # Example: input_data is a list of features
    return model.predict([input_data])[0]

def preprocess_text(text):
    """
    Basic text preprocessing for hate speech detection
    """
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = ' '.join(text.split())
    return text

def predict_hate_speech(model, text):
    """
    Predict if the given text contains hate speech
    Returns prediction label and confidence score
    """
    print(f'predict_hate_speech called with model: {type(model)}, text: {text}')
    
    try:
        # If model is None (failed to load), use a simple rule-based approach
        # if model is None:
        #     print('Model is None, using rule-based approach')
        #     # Simple rule-based hate speech detection (as fallback)
        #     hate_keywords = ['hate', 'stupid', 'idiot', 'kill', 'die', 'disgusting', 'ugly', 'worthless']
        #     text_lower = text.lower()
            
        #     hate_score = sum(1 for keyword in hate_keywords if keyword in text_lower)
            
        #     if hate_score > 0:
        #         prediction = 'hate_speech'
        #         confidence = min(0.9, 0.3 + (hate_score * 0.2))
        #     else:
        #         prediction = 'normal'
        #         confidence = 0.8
                
        #     return prediction, confidence
        
        print(f'Using model for prediction. Model type: {type(model)}')
        
        # For sklearn Pipeline models, use raw text (pipeline handles preprocessing)
        input_text = text
        
        # Make prediction with the pipeline
        print(f'Making prediction for text: "{input_text}"')
        prediction_result = model.predict([input_text])[0]
        print(f'Model prediction result: {prediction_result} (type: {type(prediction_result)})')
        
        # Handle different model output formats
        if isinstance(prediction_result, (int, type(1))):
            prediction = 'hate_speech' if prediction_result == 1 else 'normal'
        else:
            # If the model returns string labels
            prediction_str = str(prediction_result).lower()
            if 'hate' in prediction_str or '1' == prediction_str:
                prediction = 'hate_speech'
            else:
                prediction = 'normal'
        
        # Try to get confidence from decision_function if available
        confidence = 0.85  # Default confidence
        try:
            if hasattr(model, 'decision_function'):
                decision_scores = model.decision_function([input_text])[0]
                print(f'Decision function score: {decision_scores}')
                # Convert decision function score to probability-like confidence
                # For binary classification, decision_function returns single value
                if isinstance(decision_scores, (int, float)):
                    # Use sigmoid to convert to probability
                    confidence = float(1 / (1 + np.exp(-abs(decision_scores))))
                    confidence = max(0.6, min(0.95, confidence))  # Keep in reasonable range
                else:
                    confidence = 0.85
            elif hasattr(model, 'predict_proba'):
                probabilities = model.predict_proba([input_text])[0]
                confidence = float(max(probabilities))
                print(f'Predict proba confidence: {confidence}')
        except Exception as conf_e:
            print(f'Could not get confidence score: {conf_e}')
            confidence = 0.85
        
        print(f'Final prediction: {prediction}, confidence: {confidence}')
        return prediction, confidence
        
    except Exception as e:
        print(f"Error in prediction: {e}")
        import traceback
        traceback.print_exc()
        
        # Fallback to simple rule-based detection
        print('Falling back to rule-based detection due to error')
        hate_keywords = ['hate', 'stupid', 'idiot', 'kill', 'die', 'disgusting', 'ugly', 'worthless']
        text_lower = text.lower()
        
        hate_score = sum(1 for keyword in hate_keywords if keyword in text_lower)
        
        if hate_score > 0:
            prediction = 'hate_speech'
            confidence = min(0.9, 0.3 + (hate_score * 0.2))
        else:
            prediction = 'normal'
            confidence = 0.6
            
        return prediction, confidence