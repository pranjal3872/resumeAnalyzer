import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>AI Resume Analyzer</h2>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/upload" style={styles.link}>Upload</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.button}>Signup</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#111",
    color: "#fff",
  },
  link: {
    marginRight: "15px",
    color: "#fff",
    textDecoration: "none",
  },
  button: {
    padding: "6px 12px",
    background: "purple",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

export default Navbar;
