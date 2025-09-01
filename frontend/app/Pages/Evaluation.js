import React from 'react';

function Evaluation() {

  const metrics = {
    accuracy: "92%",
    precision: "89%",
    recall: "85%",
    f1: "87%"
  };

  const confusionMatrix = [
    ["", "Pred: Non-Hate", "Pred: Hate"],
    ["Actual: Non-Hate", 14000, 1000],
    ["Actual: Hate", 750, 4250]
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Model Evaluation</h1>
      <p style={{ maxWidth: "700px", lineHeight: "1.6" }}>
        This page shows the performance metrics of our Hate Speech Detection model.
      </p>

      <h2> Metrics</h2>
      <ul>
        <li>Accuracy: <strong>{metrics.accuracy}</strong></li>
        <li>Precision: <strong>{metrics.precision}</strong></li>
        <li>Recall: <strong>{metrics.recall}</strong></li>
        <li>F1 Score: <strong>{metrics.f1}</strong></li>
      </ul>

      <h2> Confusion Matrix</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", marginTop: "10px" }}
      >
        <tbody>
          {confusionMatrix.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i === 0 ? "#f2f2f2" : "white" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ textAlign: "center" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: "20px", maxWidth: "700px", lineHeight: "1.6" }}>
        The confusion matrix shows how many examples the model classified correctly or incorrectly. 
        True Positives (Hate correctly identified) = 4250, True Negatives (Non-Hate correctly identified) = 14000.
      </p>
    </div>
  );
}

export default Evaluation;
