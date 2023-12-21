"use client";
import { generate } from "random-words";
import { useEffect, useState } from "react";

import Word from "@/Components/Word";
import Start from "@/Components/Start";
import Results from "@/Components/Results";

const NUMB_OF_WORDS = 200;

export default function Home() {
  const [words, setWords] = useState([]);
  const [selectedTime, setSelectedTime] = useState(60);
  const [countDown, setCountDown] = useState(0);
  const [status, setStatus] = useState();

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [scores, setScores] = useState(0);

  //state for out record
  const [score15, setScore15] = useState(0);
  const [score30, setScore30] = useState(0);
  const [score60, setScore60] = useState(0);
  const [currInput, setCurrInput] = useState("");

  const generateWord = () => {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => generate());
  };

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "https://your-mobile-warning-page-url.com";
    }
  }, []);

  useEffect(() => {
    if (status === "finished") {
      updateScores();
    }
  }, [status]);
  useEffect(() => {
    setCountDown(selectedTime);
  }, [selectedTime]);

  const handleTimeChange = (e) => {
    setSelectedTime(parseInt(e.target.value, 10));
  };

  const updateScores = () => {
    const currentScore = correct;

    if (selectedTime === 15) {
      if (currentScore > score15) {
        setScore15(currentScore);
      }
    } else if (selectedTime === 30) {
      if (currentScore > score30) {
        setScore30(currentScore);
      }
    } else if (selectedTime === 60) {
      if (currentScore > score60) {
        setScore60(currentScore);
      }
    }

    setScores(currentScore);
  };

  return (
    <>
      <h1>Let's know how much power do you have in word typing</h1>
      <Start
        status={status}
        setWords={setWords}
        setCurrCharIndex={setCurrCharIndex}
        setCurrWordIndex={setCurrWordIndex}
        setIncorrect={setIncorrect}
        setCorrect={setCorrect}
        setCurrChar={setCurrChar}
        setStatus={setStatus}
        selectedTime={selectedTime}
        currWordIndex={currWordIndex}
        countDown={countDown}
        score15={score15}
        score30={score30}
        score60={score60}
        currCharIndex={currCharIndex}
        handleTimeChange={handleTimeChange}
        setCountDown={setCountDown}
        words={words}
        correct={correct}
        incorrect={incorrect}
        generateWord={generateWord}
        currChar={currChar}
        currInput={currInput}
        setCurrInput={setCurrInput}
      />
      {status === "started" && (
        <Word
          generateWord={generateWord}
          words={words}
          setWords={setWords}
          currChar={currChar}
          currCharIndex={currCharIndex}
          currWordIndex={currWordIndex}
          status={status}
          currInput={currInput}
        />
      )}
      {status === "finished" && (
        <Results
          selectedTime={selectedTime}
          correct={correct}
          incorrect={incorrect}
        />
      )}
    </>
  );
}
