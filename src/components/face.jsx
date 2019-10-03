import React, { useRef, useEffect } from "react";

import * as faceapi from "face-api.js";
export default () => {
  const videoEl = useRef(null);
  useEffect(() => {
    if (!videoEl) {
      return;
    }
    async function Mount() {
      try {
        await setupCamera();
      } catch (error) {
        console.log(error);

        throw new Error(
          "This browser does not support video capture, or this device does not have a camera"
        );
      }
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("./models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("./models");
        await faceapi.nets.faceExpressionNet.loadFromUri("./models");
      } catch (error) {
        console.log(error);

        throw new Error(
          "This browser does not support video capture, or this device does not have a camera"
        );
      }
      try {
        getDetection();
      } catch (error) {
        throw new Error(
          "This browser does not support video capture, or this device does not have a camera"
        );
      }
    }
    Mount();
  }, [videoEl]);
  function getDetection() {
    const intervall = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoEl.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections);
    }, 100);
  }

  async function setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    let video = videoEl.current;
    video.srcObject = stream;
    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play();
        resolve(video);
      };
    });
  }
  return (
    <div>
      <video id="video" width="720" height="560" ref={videoEl}></video>
    </div>
  );
};
