import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";

type WebcamRenderProps = {
  status: string;
  isWebcamOn: boolean;
  isPreview: boolean;
  isRecording: boolean;
  openCamera: () => void;
  closeCamera: () => void;
  retake: () => void;
  start: () => void;
  stop: () => void;
  download: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const VideoDiary = () => {
  const classes = useStyles();
  const recordWebcam = useRecordWebcam();

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" color="textPrimary">
        Video deník
      </Typography>
      <p>Camera status: {recordWebcam.status}</p>
      <div>
        <button
          disabled={
            recordWebcam.status === CAMERA_STATUS.OPEN ||
            recordWebcam.status === CAMERA_STATUS.RECORDING ||
            recordWebcam.status === CAMERA_STATUS.PREVIEW
          }
          onClick={recordWebcam.open}
        >
          Open camera
        </button>
        <button
          disabled={
            recordWebcam.status === CAMERA_STATUS.CLOSED ||
            recordWebcam.status === CAMERA_STATUS.RECORDING ||
            recordWebcam.status === CAMERA_STATUS.PREVIEW
          }
          onClick={recordWebcam.close}
        >
          Close camera
        </button>
        <button
          disabled={
            recordWebcam.status === CAMERA_STATUS.CLOSED ||
            recordWebcam.status === CAMERA_STATUS.RECORDING ||
            recordWebcam.status === CAMERA_STATUS.PREVIEW
          }
          onClick={recordWebcam.start}
        >
          Start recording
        </button>
        <button
          disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
          onClick={recordWebcam.stop}
        >
          Stop recording
        </button>
        <button
          disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
          onClick={recordWebcam.download}
        >
          Download
        </button>
      </div>

      <video
        ref={recordWebcam.webcamRef}
        style={{
          display: `${
            recordWebcam.status === CAMERA_STATUS.OPEN ||
            recordWebcam.status === CAMERA_STATUS.RECORDING
              ? "block"
              : "none"
          }`,
        }}
        autoPlay
        muted
      />
      <video
        ref={recordWebcam.previewRef}
        style={{
          display: `${
            recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
          }`,
        }}
        // autoPlay
        controls
        // muted
        loop
      />
    </div>
  );
};

export default VideoDiary;
