"use client";
import React, { useEffect, useRef } from "react";
import Scores from "./Scores";
import Input from "./Input";

const Start = ({
  statusCode,
  setWords,
  setCurrCharIndex,
  setCurrWordIndex,
  setIncorrect,
  setCorrect,
  setCurrChar,
  setStatusCode,
  selectedTime,
  currWordIndex,
  countDown,
  score15,
  score30,
  score60,
  currCharIndex,
  handleTimeChange,
  setCountDown,
  words,
  correct,
  incorrect,
  generateWord,
  currChar,
  currInput,
  setCurrInput,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (statusCode === "started") {
      inputRef.current.focus();
    }
  }, [statusCode]);

  const checkMatch = () => {
    const compareWord = words[currWordIndex];
    const match = compareWord === currInput.trim();
    if (match) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  };
  const handleStart = () => {
    if (statusCode === "finished") {
      setWords(generateWord());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }
    if (statusCode !== "started") {
      setStatusCode("started");

      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setStatusCode("finished");
            setCurrInput("");
            return selectedTime;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
  };

  const handleKeyDown = ({ keyCode, key }) => {
    if (keyCode === 32) {
      checkMatch();
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      setCurrInput("");
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  };
  return (
    <>
      <div className="top">
        <Scores score15={score15} score30={score30} score60={score60} />
        <div className="bt">
          <h2 style={{ color: "white" }}>
            you can start by choosing a time then press start button{" "}
          </h2>
          <button onClick={handleStart}> START</button>
          <p>Please Choose A Time</p>
          <select
            disabled={statusCode === "started"}
            onChange={handleTimeChange}
            value={selectedTime}
          >
            <option value={60}>60 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={15}>15 seconds</option>
          </select>
          <p>({countDown})</p>
        </div>

        <Input
          currInput={currInput}
          handleKeyDown={handleKeyDown}
          inputRef={inputRef}
          setCurrInput={setCurrInput}
          currChar={currChar}
        />
      </div>
    </>
  );
};

export default Start;
