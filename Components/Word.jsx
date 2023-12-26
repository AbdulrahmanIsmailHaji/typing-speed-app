import { useEffect, useRef, useState } from "react";

const Word = ({
  statusCode,
  currChar,
  currCharIndex,
  currWordIndex,
  words,
  setWords,
  generateWord,
  currInput,
}) => {
  useEffect(() => {
    setWords(generateWord());
  }, []);
  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      statusCode !== "finished"
    ) {
      if (char === currChar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex + 1 &&
      currInput[currCharIndex] === " " &&
      statusCode !== "finished"
    ) {
      return "has-background-light"; // Apply a different background for the space
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    } else if (
      wordIdx === currWordIndex &&
      charIdx > currCharIndex &&
      statusCode !== "finished"
    ) {
      return "has-background-remaining"; // Apply a different background for remaining characters
    } else {
      return "";
    }
  }

  return (
    <>
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
            <span> _ </span>
          </span>
        ))}
      </div>
    </>
  );
};

export default Word;
