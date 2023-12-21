"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInBtn from "./signInBtn";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="navbar">
      <Link href="/" passHref>
        <p className="title">Typing Speed App</p>
      </Link>
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
          <button className="button"> Log In</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
