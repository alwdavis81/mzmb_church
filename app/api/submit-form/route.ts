import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: NextRequest) {
  const token = process.env.SANITY_WRITE_TOKEN?.trim();
  if (!token || token === "add-your-token-here") {
    return NextResponse.json(
      { error: "Server not configured for form submissions yet. Add SANITY_WRITE_TOKEN to environment." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { type, _gotcha, ...data } = body;

    // Silent discard for bot honeypots
    if (_gotcha) {
      return NextResponse.json({ success: true });
    }

    if (type !== "contact" && type !== "prayer") {
      return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
    }

    if (type === "contact" && (!data.name || !data.email || !data.message)) {
      return NextResponse.json({ error: "Missing required contact fields" }, { status: 400 });
    }

    if (type === "prayer" && !data.prayerRequest) {
      return NextResponse.json({ error: "Missing prayer request content" }, { status: 400 });
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
