import { NextResponse } from "next/server";
import { readData, writeData, genId } from "@/lib/data";
import { requireAuth } from "@/lib/guard";

export async function GET(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  return NextResponse.json(readData("bookings").reverse());
}

export async function POST(req) {
  // Public: anyone can submit a booking request
  const body = await req.json();
  if (!body.name || !body.phone) {
    return NextResponse.json({ error: "Ism va telefon raqami majburiy" }, { status: 400 });
  }
  const bookings = readData("bookings");
  const item = {
    id: genId(),
    name: body.name,
    phone: body.phone,
    service: body.service || "",
    date: body.date || "",
    comment: body.comment || "",
    status: "new",
    createdAt: new Date().toISOString(),
  };
  bookings.push(item);
  writeData("bookings", bookings);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const body = await req.json();
  const bookings = readData("bookings");
  const idx = bookings.findIndex((b) => b.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  bookings[idx] = { ...bookings[idx], ...body };
  writeData("bookings", bookings);
  return NextResponse.json(bookings[idx]);
}

export async function DELETE(req) {
  const unauth = requireAuth(req);
  if (unauth) return unauth;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const bookings = readData("bookings").filter((b) => b.id !== id);
  writeData("bookings", bookings);
  return NextResponse.json({ ok: true });
}
