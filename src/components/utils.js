import * as posenet from "@tensorflow-models/posenet";

const pointRadius = 3;

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
export const config = {
  videoWidth: size.width,
  videoHeight: size.height
};

function toTuple({ x, y }) {
  return [config.videoWidth - x, y];
}

export function drawKeyPoints(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const { x, y } = keypoint.position;

      canvasContext.beginPath();
      canvasContext.arc(
        toTuple({ x, y })[0] * scale,
        toTuple({ x, y })[1] * scale,
        pointRadius,
        0,
        2 * Math.PI
      );
      canvasContext.fillStyle = skeletonColor;
      canvasContext.fill();
    }
  });
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  canvasContext.beginPath();
  canvasContext.moveTo(firstX * scale, firstY * scale);
  canvasContext.lineTo(nextX * scale, nextY * scale);
  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = color;
  canvasContext.stroke();
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    );
  });
}
