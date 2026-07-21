import { NextResponse } from "next/server";
import { ADMIN_USERNAME, ADMIN_PASSWORD, createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req) {
  const { username, password } = await req.json();
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = createToken(username);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }
  return NextResponse.json({ error: "invalid" }, { status: 401 });
}
