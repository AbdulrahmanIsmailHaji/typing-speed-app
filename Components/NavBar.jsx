"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <nav className={`navbar ${isVisible ? "visible" : ""}`}>
      <Link href="/" passHref>
        <p className="title">Typing Speed App</p>
      </Link>

      <ul className="list">
        <li>
          <Link href="/result">Result</Link>
        </li>
        <li>
          <Link href="/type">Typing</Link>
        </li>
      </ul>
      {status === "authenticated" ? (
        <div className="user-info">
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="profile-picture"
            />
          )}

          <span className="user-name">{session.user.name}</span>

          <button onClick={() => signOut()} className="button">
            Sign Out
          </button>
        </div>
      ) : (
        <Link href="/login">
          <button className="button"> Sign In</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
