import { NextResponse } from "next/server";
import { readData, writeData, genId } from "@/lib/data";
import { requireAuth } from "@/lib/guard";

export async function GET() {
  return NextResponse.json(readData("gallery"));
}

export async function POST(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const body = await req.json();
  const gallery = readData("gallery");
  const item = { id: genId(), ...body };
  gallery.push(item);
  writeData("gallery", gallery);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const body = await req.json();
  const gallery = readData("gallery");
  const idx = gallery.findIndex((s) => s.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  gallery[idx] = { ...gallery[idx], ...body };
  writeData("gallery", gallery);
  return NextResponse.json(gallery[idx]);
}

export async function DELETE(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const gallery = readData("gallery").filter((s) => s.id !== id);
  writeData("gallery", gallery);
  return NextResponse.json({ ok: true });
}
