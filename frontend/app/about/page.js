export default function AboutPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>About Our Project</h1>
      <p style={{ maxWidth: "600px", lineHeight: "1.6" }}>
        This project is a <strong>Hate Speech Detection System</strong> built with 
        Machine Learning, Flask for the backend, and Next.js for the frontend. 
        It helps detect and classify harmful content in text to make 
        online communication safer.
      </p>

      <h2>Our Team</h2>
      <ul>
        <li> Mahmudul Hasan Mridul (Reg. No: 2020831005)</li>
        <li> Gilman Md. Rejuan (Reg. No: 2020831040)</li>
      </ul>

      <h2>GitHub Repository</h2>
      <p>
        You can find the full project here:{" "}
        <a
          href="https://github.com/Gmanrejuan/ML_Project"
          target="_blank"
          rel="noopener noreferrer"
        >
          ML_Project on GitHub
        </a>
      </p>
    </div>
  );
}
