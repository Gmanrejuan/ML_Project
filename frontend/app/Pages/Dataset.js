import React from 'react'

function Dataset() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Dataset Information</h1>
      <p style={{ maxWidth: "700px", lineHeight: "1.6" }}>
        For this project, we used a labeled dataset containing text samples 
        categorized as <strong>Hate Speech</strong> or <strong>Non-Hate Speech</strong>. 
        The dataset was essential for training and testing our machine learning model.
      </p>

      <h2> Dataset Overview</h2>
      <ul>
        <li>Total Samples: <strong>20,000+</strong></li>
        <li>Hate Speech Samples: <strong>~5,000</strong></li>
        <li>Non-Hate Speech Samples: <strong>~15,000</strong></li>
        <li>Format: <code>.csv</code> file with text and label columns</li>
      </ul>

      <h2> Example Data</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Text</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"I hate this group of people..."</td>
            <td>Hate Speech</td>
          </tr>
          <tr>
            <td>"Have a nice day everyone!"</td>
            <td>Non-Hate Speech</td>
          </tr>
        </tbody>
      </table>

      <h2> Source</h2>
      <p>
        The dataset was taken from publicly available sources such as{" "}
        <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer">
          Kaggle
        </a>{" "}
        and processed for this project.
      </p>
    </div>
  )
}

export default Dataset
