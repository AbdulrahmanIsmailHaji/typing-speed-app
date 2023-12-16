import React from "react";

const Scores = ({ score15, score30, score60 }) => {
  return (
    <div className="score">
      <p>This is the score record:</p>
      <p>
        Words per 60 seconds:{" "}
        <span className="bep-score">{score60.toFixed(2)}</span>
        <br />
        Words per 30 seconds:
        <span className="bep-score">{score30.toFixed(2)}</span>
        <br />
        Words per 15 seconds:{" "}
        <span className="bep-score">{score15.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default Scores;
