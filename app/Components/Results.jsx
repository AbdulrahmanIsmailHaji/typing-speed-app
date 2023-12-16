import React from "react";

const Results = ({ selectedTime, correct, incorrect }) => {
  return (
    <>
      <div className="section">
        <div className="columns">
          <div className="column has-text-centered">
            {<p>Words per {selectedTime}:</p>}
            <p className="has-text-primary ">{correct}</p>
          </div>
          <div className="column has-text-centered">
            <p>Accuracy:</p>
            <p className="has-text-info ">
              {correct !== 0
                ? `${Math.round((correct / (correct + incorrect)) * 100)}%`
                : "0%"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
