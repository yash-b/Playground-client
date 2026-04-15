import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

function SmsPage() {
  const navigate = useNavigate();

  const [mobile_number, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [company, setCompany] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

const onEmojiClick = (emojiData: any) => {
  setMessage((prev) => prev + emojiData.emoji);
};

  const sendSms = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("https://playground-server-production.up.railway.app/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number,
          message,
          password,
          company
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setStatus("❌ Incorrect password");
          setIsUnlocked(false);
          return;
        }
        throw new Error("Failed to send SMS");
      }

      setStatus("✅ SMS is on the way!");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("❌ SMS Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
  {!isUnlocked && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "30px",
              borderRadius: "16px",
              textAlign: "center",
              width: "300px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2 style={{ color: "white" }}>🔒 Enter Password</h2>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: "92%",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "#222",
                color: "white",
              }}
            />

            <button
              onClick={handleUnlock}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#4f46e5",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Unlock
            </button>

            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </div>
        </div>
      )}

   <div 
      style={{ 
        textAlign: "center", 
        position: "relative",
        filter: isUnlocked ? "none" : "blur(5px)",
        pointerEvents: isUnlocked? "auto" : "none" 
      }}
    >
      {/* BACK BUTTON */}
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

      <h1>📨 Send SMS 📨</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "20px",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* PHONE INPUT */}
          <input
            placeholder="Phone number (10-digits only 5551234567)"
            value={mobile_number}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "95%",
              padding: "12px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.3)",
              color: "white",
              outline: "none",
            }}
          />
          {/* Company INPUT */}
          <input
            placeholder="Company Name"
            value={company}
            style={{
              display: "none",
              width: "95%",
              padding: "12px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.3)",
              color: "white",
              outline: "none",
            }}
          />
          <div style={{ position: "relative", width: "95%", marginBottom: "10px" }}>
  
            {/* TEXTAREA */}
            <textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              style={{
                width: "93%",
                padding: "12px 40px 12px 12px", // extra right padding for emoji button
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.3)",
                color: "white",
                outline: "none",
                resize: "none",
              }}
            />

            {/* 😊 EMOJI BUTTON INSIDE */}
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "-20px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              😊
            </button>

            {/* EMOJI PICKER */}
            {showEmojiPicker && (
              <div
                style={{
                  position: "fixed",
                  top: "200px", 
                  bottom: "60px",
                  right: "20px",
                  zIndex: 100,
                }}
              >
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          {/* SEND BUTTON */}
          <button
            onClick={sendSms}
            disabled={loading || !mobile_number || !message}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: loading ? "gray" : "#4f46e5",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Sending..." : "Send SMS"}
          </button>

            </div>
          </div>

          {/* STATUS */}
          {status && (
            <p style={{ marginTop: "15px", textAlign: "center" }}>
              {status}
            </p>
          )}
        </div>
        </>
      );
    }

export default SmsPage;