import React from "react";

const CountdownTimer = ({ countDown }) => {
  const radius = 33;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((60 - countDown) / 60) * circumference;

  return (
    <div className="tst-timer u-bg-white u-round u-text-center">
      <div className="countdown-container">
        <svg
          viewBox="0 0 110 110"
          width="110"
          height="110"
          className="u-w-auto u-absolute"
        >
          <circle
            className="countdown-circle"
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="#ffd000"
            strokeWidth="6"
            strokeDasharray={`${circumference}px`}
            style={{
              transition: "all 1s linear",
              strokeDashoffset: `${strokeDashoffset}px`,
              transform: "rotate(-90deg)", // Rotate the circle to start from the top center
              transformOrigin: "center",
            }}
          />
        </svg>
      </div>
      <p className="countdown-text">{countDown}</p>
      <p style={{ color: "black" }} className="countdown-unit">
        seconds
      </p>
    </div>
  );
};

export default CountdownTimer;
