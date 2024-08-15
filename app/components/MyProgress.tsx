"use client";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// components/ProgressBar.tsx

import React from "react";

interface ProgressBarProps {
  progress: number;
}

const MyProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <br></br>
    </>
  );
};

export default MyProgressBar;
