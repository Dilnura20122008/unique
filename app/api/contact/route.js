import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { requireAuth } from "@/lib/guard";

export async function GET() {
  return NextResponse.json(readData("contact"));
}

export async function PUT(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const body = await req.json();
  const current = readData("contact");
  const updated = { ...current, ...body };
  writeData("contact", updated);
  return NextResponse.json(updated);
}
