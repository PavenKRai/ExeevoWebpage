import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/lib/sanity";

/**
 * Sanity calls this when a document is published, changed or unpublished (webhook set up in the Sanity project).
 * The signature is checked with SANITY_REVALIDATE_SECRET; then every cached Sanity read is marked stale, so the next
 * visit to any page fetches the fresh content. The whole content set is small, so one tag is enough.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: "Revalidation is not configured." }, { status: 503 });
  try {
    const { isValidSignature } = await parseBody(request, secret);
    if (!isValidSignature) return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    revalidateTag(SANITY_TAG, { expire: 0 });
    return NextResponse.json({ ok: true, revalidated: SANITY_TAG });
  } catch {
    return NextResponse.json({ error: "Could not read the webhook body." }, { status: 400 });
  }
}
