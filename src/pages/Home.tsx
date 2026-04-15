import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(12px)",
  };

  const hover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.25)";
  };

  const reset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
  };

  return (
    
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        maxWidth: "1000px",
        margin: "0 auto",
        gap: "30px",
      }}
    > 
      <button
        onClick={() => { window.location.href = "https://yash-b.github.io/"; }}
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
        ⬅️ Home
      </button>     
      {/* 🔷 INFO / HERO SECTION */}
      <div
        style={{
          width: "100%",
          padding: "28px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
          🛝 My Playground 🎢
        </h1>

        <p style={{ opacity: 0.75, lineHeight: "1.5" }}>
          This app lets you detect and label objects instantly, send SMS messages, and something else that I haven't decided yet.
          Get in touch with me, if you would like.
        </p>
      </div>

      {/* 🔷 GRID SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          width: "100%",
        }}
      >
        <div
          style={cardStyle}
          onClick={() => navigate("/webcam")}
          onMouseEnter={hover}
          onMouseLeave={reset}
        >
          📦 Recognize Objects 📦
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/sms")}
          onMouseEnter={hover}
          onMouseLeave={reset}
        >
          💬 Send SMS 💬
        </div>

        <div
          style={{
            ...cardStyle,
            cursor: "not-allowed"
          }}
          onMouseEnter={hover}
          onMouseLeave={reset}
        >
          🚧 Under Construction 🚧
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/contactme")}
          onMouseEnter={hover}
          onMouseLeave={reset}
        >
           📞 Contact Me 📞
        </div>
      </div>
    </div>
  );
}

export default Home;