import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: NextRequest) {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Server not configured for form submissions yet. Add SANITY_WRITE_TOKEN to environment." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { type, ...data } = body;

    if (type !== "contact" && type !== "prayer") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const doc =
      type === "contact"
        ? { _type: "contactSubmission", ...data, submittedAt: new Date().toISOString() }
        : { _type: "prayerRequest", ...data, submittedAt: new Date().toISOString() };

    await writeClient.create(doc);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Form submission error:", err);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}