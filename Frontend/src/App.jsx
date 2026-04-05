import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/classify", {
        text,
      });
      setResult(res.data);
    } catch (err) {
      alert("Error classifying email");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>Email Classifier</h2>

      <textarea
        rows="6"
        cols="60"
        placeholder="Paste email content..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {loading ? "Classifying..." : "Classify"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p><b>Category:</b> {result.category}</p>
          <p><b>Confidence:</b> {result.confidence}</p>
          <pre>
          <b>Data:</b>
          {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;