import { Webhook } from "coinbase-commerce-node";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET;

export async function POST(req) {
  const allHeaders = headers();

  const rawBody = await req.json();
  const stringBody = JSON.stringify(rawBody);
  const signature = allHeaders.get("x-cc-webhook-signature");
  const webhookSecret = COINBASE_WEBHOOK_SECRET;

  try {
    const event = Webhook.verifyEventBody(stringBody, signature, webhookSecret);
    console.log("event", event);

    if (event.type === "charge:confirmed") {
      console.log("HAHA", event.data.metadata);
    }

    return NextResponse.json(null, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(null, {
      status: 500,
      statusText: "There was an error, please try again",
    });
  }
}
