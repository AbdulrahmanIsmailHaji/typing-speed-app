import React from "react";

const Results = ({ selectedTime, correct, incorrect }) => {
  let accuracy;

  if (correct + incorrect !== 0) {
    accuracy = `${Math.round((correct / (correct + incorrect)) * 100)}%`;
  } else {
    accuracy = "0%";
  }

  return (
    <>
      <div className="section">
        <div className="columns">
          <div className="column ">
            <div style={{ color: "black", width: "200px" }}>
              Words per {selectedTime}
            </div>
            <div className="has-text-info ">{correct ? correct : 0}</div>
          </div>
          <div className="column ">
            <div style={{ color: "black" }}>Accuracy</div>
            <div className="has-text-info ">{accuracy}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
