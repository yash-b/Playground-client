import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

function Webcam() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  const [model, setModel] =
    useState<cocoSsd.ObjectDetection | null>(null);

  // 1. Load ML model
  useEffect(() => {
    let isMounted = true;

    cocoSsd.load().then((loadedModel) => {
      if (!isMounted) return;
      setModel(loadedModel);
      console.log("Model loaded");
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Start webcam + CLEANUP FIX
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = async () => {
            await videoRef.current?.play();
            console.log("Video playing");
          };
        }
      } catch (err) {
        console.error("Webcam error:", err);
      }
    };

    startWebcam();

    // 🔥 CLEANUP: stop webcam
    return () => {
      console.log("Stopping webcam...");

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  // 3. Detection loop + CLEANUP FIX
  useEffect(() => {
    if (!model) return;

    const detect = async () => {
      if (!videoRef.current || !canvasRef.current) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const predictions = await model.detect(video);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      predictions.forEach((p) => {
        const [x, y, width, height] = p.bbox;

        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = "#00FF00";
        ctx.font = "16px Arial";
        ctx.fillText(
          `${p.class} ${(p.score * 100).toFixed(1)}%`,
          x,
          y > 10 ? y - 5 : 10
        );
      });

      animationRef.current = requestAnimationFrame(detect);
    };

    detect();

    // 🔥 CLEANUP detection loop
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [model]);

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
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
        ⬅️ Back
      </button>

      <h1>📦 Recognize Objects 📦</h1>

      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ display: "none" }}
        />

        <canvas
          ref={canvasRef}
          style={{
            width: "600px",
            borderRadius: "12px",
          }}
        />
      </div>
    </div>
  );
}

export default Webcam;