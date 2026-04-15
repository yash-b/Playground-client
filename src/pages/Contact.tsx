import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      showToast("❌ Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      showToast("❌ Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/contact-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          message
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send SMS");
      }

      showToast("✅ Email sent!");
      setName("");
      setMessage("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setToast("❌ Email Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "60px",
        position: "relative",
      }}
    >              {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          fontWeight: 600,
          zIndex: 10,
        }}
      >
        ← Back
      </button>
      {/* TOAST */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            fontSize: "14px",
          }}
        >
          {toast}
        </div>
      )}

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "20px",
          backdropFilter: "blur(12px)",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Contact Me</h2>
        
        {/* HoneyPot (bot detection) */}
        <input
          type="text"
          style={{ display: "none" }}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        {/* NAME */}
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "95%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.3)",
            color: "white",
            outline: "none",
          }}
        />

        {/* EMAIL */}
        <input
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "95%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.3)",
            color: "white",
            outline: "none",
          }}
        />

        {/* MESSAGE */}
        <textarea
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          style={{
            width: "95%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.3)",
            color: "white",
            outline: "none",
            resize: "none",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: loading
              ? "rgba(255,255,255,0.2)"
              : "linear-gradient(90deg, #6a11cb, #2575fc)",
            color: "white",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s ease",
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}

export default Contact;