"use client";
import { generate } from "random-words";
import { useEffect, useState } from "react";
import Link from "next/link";

import Word from "@/Components/Word";
import Start from "@/Components/Start";
import Results from "@/Components/Results";
import { useSession } from "next-auth/react";
import "../globals.css";

const NUMB_OF_WORDS = 100;

export default function Home() {
  const [words, setWords] = useState([]);
  const [selectedTime, setSelectedTime] = useState(60);
  const [countDown, setCountDown] = useState(0);
  const [statusCode, setStatusCode] = useState("waiting");

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  //state for out record
  const [score15, setScore15] = useState(0);
  const [score30, setScore30] = useState(0);
  const [score60, setScore60] = useState(0);

  const [currInput, setCurrInput] = useState("");

  const session = useSession();

  const { status, data: userData } = session;

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
    setCountDown(selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    if (statusCode === "finished") {
      sendScores();
    }
  }, [statusCode]);
  const handleTimeChange = (e) => {
    setSelectedTime(parseInt(e.target.value, 10));
  };

  const sendScores = async () => {
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
    if (status === "authenticated") {
      try {
        const res = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData?.user?.name,
            email: userData?.user?.email,
            score15: selectedTime === 15 ? currentScore : score15,
            score30: selectedTime === 30 ? currentScore : score30,
            score60: selectedTime === 60 ? currentScore : score60,
          }),
        });

        if (res.ok) {
          console.log("New scores created successfully");
        } else {
          console.error("Failed to create new scores");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      {/* <h1>Let's know how much power do you have in word typing</h1> */}
      <div className="all">
        <Start
          statusCode={statusCode}
          setWords={setWords}
          setCurrCharIndex={setCurrCharIndex}
          setCurrWordIndex={setCurrWordIndex}
          setIncorrect={setIncorrect}
          setCorrect={setCorrect}
          setCurrChar={setCurrChar}
          setStatusCode={setStatusCode}
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
          setSelectedTime={setSelectedTime}
        />

        <Word
          generateWord={generateWord}
          words={words}
          setWords={setWords}
          currChar={currChar}
          currCharIndex={currCharIndex}
          currWordIndex={currWordIndex}
          statusCode={statusCode}
          currInput={currInput}
        />

        {statusCode === "finished" && (
          <>
            <Link href="/result">
              {" "}
              <p className="high-score">click here to See Your High score</p>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
