"use client";
import Results from "@/Components/Results";
import Scores from "@/Components/Scores";

const OverallScore = ({ score15, score30, score60 }) => {
  return (
    <>
      <Scores score15={score15} score30={score30} score60={score60} />
    </>
  );
};

export default OverallScore;
