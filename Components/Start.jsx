"use client";
import React, { useEffect, useRef, useState } from "react";

import Input from "./Input";
import Results from "./Results";
import CountdownTimer from "./CountDownTimer";

const TimeSelector = ({ disabled, selectedTime, handleTimeChange }) => {
  const [activeTime, setActiveTime] = useState(selectedTime);

  const handleOptionClick = (time) => {
    handleTimeChange({ target: { value: time } });
    setActiveTime(time);
  };

  return (
    <div className="time-selector">
      <div className="options">
        <button
          onClick={() => handleOptionClick(60)}
          disabled={disabled}
          className={activeTime === 60 ? "active-button" : ""}
        >
          60
        </button>
        <button
          onClick={() => handleOptionClick(30)}
          disabled={disabled}
          className={activeTime === 30 ? "active-button" : ""}
        >
          30
        </button>
        <button
          onClick={() => handleOptionClick(15)}
          disabled={disabled}
          className={activeTime === 15 ? "active-button" : ""}
        >
          15
        </button>
      </div>
    </div>
  );
};

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
  setSelectedTime,
}) => {
  const inputRef = useRef(null);
  const intervalRef = useRef(null);
  const [resetState, setResetState] = useState(false);

  useEffect(() => {
    if (statusCode === "started") {
      inputRef.current.focus();
      setResetState(true);
    }
    if (statusCode === "finished") {
      setResetState(false);
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
    setResetState(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (statusCode === "finished") {
      setWords(generateWord());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
      setResetState(false);
    }
    if (statusCode !== "started") {
      setStatusCode("started");

      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 0) {
            clearInterval(intervalRef.current);
            setStatusCode("finished");
            setCurrInput("");
            return selectedTime;
          } else {
            return prev - 1;
          }
        });
      }, 1000);

      // Store the interval ID in the ref
      intervalRef.current = interval;
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

  const handleReset = () => {
    setWords(generateWord());
    setCurrWordIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setCurrCharIndex(-1);
    setCurrChar("");
    setResetState(false);
    setStatusCode("waiting");

    setCountDown(selectedTime);

    // Clear the interval by checking if it exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <>
      <div className="top">
        <div className="select">
          <div className="result">
            <Results
              selectedTime={selectedTime}
              correct={correct}
              incorrect={incorrect}
            />
          </div>

          <div className="bt">
            <p>Please Choose A Time</p>
            {!resetState && <button onClick={handleStart}>start</button>}
            {resetState && <button onClick={handleReset}>reset</button>}
            <TimeSelector
              disabled={statusCode === "started"}
              selectedTime={selectedTime}
              handleTimeChange={handleTimeChange}
            />
          </div>
          <CountdownTimer countDown={countDown} />
        </div>

        <div className="input-div">
          <Input
            currInput={currInput}
            handleKeyDown={handleKeyDown}
            inputRef={inputRef}
            setCurrInput={setCurrInput}
            currChar={currChar}
            statusCode={statusCode}
          />
        </div>
      </div>
    </>
  );
};

export default Start;
