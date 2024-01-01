"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulating a delay with setTimeout
    const delay = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className={`main ${isVisible ? "visible" : ""}`}>
      <div className="inner-main">
        <h1 style={{ color: "white" }}>Welcome To Typing App</h1>
        <div className="styled-line"></div>
        <h2>
          Embark on your typing journey by clicking the engaging "Start" button
          below.
        </h2>
        <div style={{ width: "800px" }} className="styled-line"></div>
        <Link href="/type" className="start-button">
          Start Typing
        </Link>
      </div>
    </div>
  );
};

export default Header;
