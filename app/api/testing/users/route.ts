import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("/testing allowed only in development");
  }

  const body = await request.json().catch(() => null);
  const { username, name, password } = body ?? {};

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  return NextResponse.json({ status: 201 });
}
