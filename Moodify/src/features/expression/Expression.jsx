import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");
  const faceLandmarkerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    async function initialize() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          runningMode: "VIDEO",
          outputFaceBlendshapes: true,
          numFaces: 1,
        }
      );

      faceLandmarkerRef.current = faceLandmarker;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        detectLoop();
      };
    }

    function detectExpression(blendshapes) {
      const scores = {};

      blendshapes.forEach((item) => {
        scores[item.categoryName] = item.score;
      });

      const smile =
        ((scores.mouthSmileLeft || 0) +
          (scores.mouthSmileRight || 0)) /
        2;

      const jawOpen = scores.jawOpen || 0;
      const browUp = scores.browInnerUp || 0;

      const blink =
        ((scores.eyeBlinkLeft || 0) +
          (scores.eyeBlinkRight || 0)) /
        2;

      if (smile > 0.5) {
        return "😊 Happy";
      }

      if (jawOpen > 0.5 && browUp > 0.3) {
        return "😲 Surprised";
      }

      if (blink > 0.7) {
        return "😉 Blinking";
      }

      return "😐 Neutral";
    }

    function drawFaceLandmarks(landmarks) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "lime";

      landmarks.forEach((point) => {
        ctx.beginPath();
        ctx.arc(
          point.x * canvas.width,
          point.y * canvas.height,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    }

    function detectLoop() {
      const video = videoRef.current;
      const faceLandmarker = faceLandmarkerRef.current;

      if (
        !video ||
        !faceLandmarker ||
        video.readyState < 2
      ) {
        animationFrameId =
          requestAnimationFrame(detectLoop);
        return;
      }

      const results = faceLandmarker.detectForVideo(
        video,
        performance.now()
      );

      if (
        results.faceBlendshapes &&
        results.faceBlendshapes.length > 0
      ) {
        const blendshapes =
          results.faceBlendshapes[0].categories;

        setExpression(
          detectExpression(blendshapes)
        );
      }

      if (
        results.faceLandmarks &&
        results.faceLandmarks.length > 0
      ) {
        drawFaceLandmarks(
          results.faceLandmarks[0]
        );
      }

      animationFrameId =
        requestAnimationFrame(detectLoop);
    }

    initialize();

    return () => {
      cancelAnimationFrame(animationFrameId);

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "640px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "640px",
          borderRadius: "10px",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "640px",
          height: "480px",
          pointerEvents: "none",
        }}
      />

      <h2>Expression: {expression}</h2>
      <button>detectL</button>
    </div>
  );
}