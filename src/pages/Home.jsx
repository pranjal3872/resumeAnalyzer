import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1>Analyze Your Resume with AI</h1>
      <p>Upload your resume and get ATS score & suggestions instantly.</p>

      <Link to="/upload">
        <button style={styles.button}>Upload Resume</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
  },
  button: {
    padding: "12px 25px",
    fontSize: "16px",
    background: "purple",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Home;
