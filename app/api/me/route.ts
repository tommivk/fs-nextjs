import { getUserByToken } from "../../services/users";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const header = request.headers.get("authorization") ?? "";

  const match = header.startsWith("Bearer");
  if (!match) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [_, token] = header.split(" ");

  const user = await getUserByToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json(user);
}
