"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { generate } from "random-words";
import { useEffect, useRef, useState } from "react";
const NUMB_OF_WORDS = 200;

export default function Home() {
  const [words, setWords] = useState([]);
  const [selectedTime, setSelectedTime] = useState(60);
  const [countDown, setCountDown] = useState(0);
  const inputRef = useRef(null);
  const [status, setStatus] = useState();
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [scores, setScores] = useState(0);

  const generateWord = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => generate());
  };

  useEffect(() => {
    setWords(generateWord());
  }, []);
  useEffect(() => {
    if (status === "finished") {
      updateScores();
    }
    console.log("score is updated", scores);
  }, [status]);
  useEffect(() => {
    setCountDown(selectedTime);
  }, [selectedTime]);
  useEffect(() => {
    if (status === "started") {
      inputRef.current.focus();
    }
  }, [status]);

  const handleStart = () => {
    if (status === "finished") {
      setWords(generateWord());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
      updateScores();
    }
    if (status !== "started") {
      setStatus("started");
      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setStatus("finished");
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

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    } else {
      return "";
    }
  }
  const checkMatch = () => {
    const compareWord = words[currWordIndex];
    const match = compareWord === currInput.trim();
    if (compareWord) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  };
  const handleTimeChange = (e) => {
    setSelectedTime(parseInt(e.target.value, 10));
  };

  const updateScores = () => {
    if (scores === 0) {
      setScores(correct);
    } else if (correct > scores) {
      setScores(correct);
    }
  };

  return (
    <>
      <h1>Let's know how much power do you have in word typing</h1>
      <div className="top">
        <div className="bt">
          <h2 style={{ color: "white" }}>
            you can start by choosing a time then press start button{" "}
          </h2>
          <button onClick={handleStart}> START</button>
          <p>Please Choose A Time</p>
          <select onChange={handleTimeChange} value={selectedTime}>
            <option value={60}>60 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={15}>15 seconds</option>
          </select>
          <p>({countDown})</p>
        </div>

        <div className="score">
          <p>This is the score record:</p>
          <p>
            Words per {selectedTime}: {scores.toFixed(2)}
          </p>
        </div>
        <div className="input-field">
          <textarea
            value={currInput}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            type="text"
            id="input"
            name="input"
            onChange={(e) => setCurrInput(e.target.value)}
          />
        </div>
      </div>
      {status === "started" && (
        <div className="paragraph">
          {words.map((word, i) => (
            <span key={i}>
              <span>
                {word.split("").map((char, idx) => (
                  <span className={getCharClass(i, idx, char)} key={idx}>
                    {char}
                  </span>
                ))}
              </span>
              <span> </span>
            </span>
          ))}
        </div>
      )}

      {status === "finished" && (
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
      )}
    </>
  );
}
