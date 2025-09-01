import React from 'react';

function Model() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Machine Learning Model</h1>
      <p style={{ maxWidth: "700px", lineHeight: "1.6" }}>
        Our Hate Speech Detection system uses a <strong>Supervised Machine Learning</strong> 
        model to classify text as <strong>Hate Speech</strong> or <strong>Non-Hate Speech</strong>. 
        The model is trained on a labeled dataset using <strong>TF-IDF features</strong> extracted from text.
      </p>

      <h2>🛠 Model Details</h2>
      <ul>
        <li>Algorithm: <strong>Stochastic Gradient Descent (SGD) Classifier</strong></li>
        <li>Feature Extraction: <strong>TF-IDF Vectorization</strong></li>
        <li>Training Data: ~20,000 text samples</li>
      </ul>

      <h2> Model Performance</h2>
      <ul>
        <li>Accuracy: <strong>~92%</strong></li>
        <li>Precision: <strong>89%</strong></li>
        <li>Recall: <strong>85%</strong></li>
        <li>F1 Score: <strong>87%</strong></li>
      </ul>

      <h2> How It Works</h2>
      <p style={{ maxWidth: "700px", lineHeight: "1.6" }}>
        When a user inputs text, it is preprocessed (cleaned and tokenized) and converted into a TF-IDF vector. 
        The trained SGD model then predicts whether the text contains hate speech.
      </p>
    </div>
  );
}

export default Model;
