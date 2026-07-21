import { NextResponse } from "next/server";
import { readData, writeData, genId } from "@/lib/data";
import { requireAuth } from "@/lib/guard";

export async function GET() {
  return NextResponse.json(readData("services"));
}

export async function POST(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const body = await req.json();
  const services = readData("services");
  const item = { id: genId(), ...body };
  services.push(item);
  writeData("services", services);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const body = await req.json();
  const services = readData("services");
  const idx = services.findIndex((s) => s.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  services[idx] = { ...services[idx], ...body };
  writeData("services", services);
  return NextResponse.json(services[idx]);
}

export async function DELETE(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const services = readData("services").filter((s) => s.id !== id);
  writeData("services", services);
  return NextResponse.json({ ok: true });
}
