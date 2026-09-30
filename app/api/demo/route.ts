import { NextResponse } from "next/server";
import { demoSchema } from "@/lib/demoSchema";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = demoSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const endpoint = process.env.CRM_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ error: "The demo request service is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!res.ok) return NextResponse.json({ error: "The CRM did not accept the request." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The CRM could not be reached." }, { status: 502 });
  }
}
