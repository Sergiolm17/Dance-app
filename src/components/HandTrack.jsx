/*import React, { Component } from "react";
import * as handTrack from "handtrackjs";
const size =
  window.screen.height > window.screen.width
    ? {
        width: window.screen.width * 1.2857,
        height: window.screen.width
      }
    : {
        width: window.screen.height * 1.2857,
        height: window.screen.height
      };
export default class HandTrack extends Component {
  static defaultProps = {
    videoWidth: size.width,
    videoHeight: size.height,
    flipHorizontal: true,
    algorithm: "single-pose", //"multi-pose", // single-pose
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.0, //0.1
    minPartConfidence: 0.1, //0.5
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: "#ffadea",
    skeletonLineWidth: 6,
    loadingText: "Loading...please be patient..."
  };
  constructor(props) {
    super(props);
  }
  getCanvas = elem => {
    this.canvas = elem;
  };

  getVideo = elem => {
    this.video = elem;
  };
  async componentDidMount() {
    try {
      await this.setupCamera();
    } catch (error) {
      throw new Error(
        "This browser does not support video capture, or this device does not have a camera"
      );
    }

    try {
      this.handTrack = await handTrack.load();
    } catch (error) {
      throw new Error("PoseNet failed to load");
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }
    this.poseDetectionFrame();
  }
  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }
    const { videoWidth, videoHeight } = this.props;
    const video = this.video;
    video.width = videoWidth;
    video.height = videoHeight;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: videoWidth,
        height: videoHeight
      }
    });

    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play();
        resolve(video);
      };
    });
  }
  detectPose() {
    const { videoWidth, videoHeight } = this.props;
    const canvas = this.canvas;
    const canvasContext = canvas.getContext("2d");

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    this.poseDetectionFrame(canvasContext);
  }
  poseDetectionFrame(canvasContext) {
    const video = this.video;
    const handTrackModel = this.handTrack;

    const findPoseDetectionFrame = async () => {
      const status = await handTrack.startVideo(video);
      if (status) runDetection();
    };
    const runDetection = async () => {
      console.log("ddddddddd");

      const predictions = await handTrackModel.detect(video);
      console.log(predictions);
    };
    findPoseDetectionFrame();
  }

  render() {
    return (
      <div className="App-header">
        <video id="videoNoShow" playsInline ref={this.getVideo} />
        <canvas className="webcam" ref={this.getCanvas} />
      </div>
    );
  }
}
*/
