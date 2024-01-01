"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="signin-container">
      <button onClick={handleSignIn} className="signinBtn">
        <Image
          alt="google logo"
          src="/google-logo.png"
          width={30}
          height={30}
        />
        <span className="btnContainer">Sign in with Google</span>
      </button>
    </div>
  );
}
