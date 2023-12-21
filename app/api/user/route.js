import { connectMongoDB } from "@/lib/mongodb";
import User from "@/model/user";

import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, score15, score30, score60 } = await request.json();
  console.log(score15, score30, score60, name, email);

  await connectMongoDB();

  await User.create({
    name,
    email,
    highScore15: score15,
    highScore30: score30,
    highScore60: score60,
  });

  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
