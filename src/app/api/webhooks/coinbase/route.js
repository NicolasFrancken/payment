import { Webhook } from "coinbase-commerce-node";
import express from "express";
import { NextResponse } from "next/server";

const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET;

const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

export async function POST(req) {
  const { rawBody } = req;
  const signature = req.headers["x-cc-webhook-signature"];
  const webhookSecret = COINBASE_WEBHOOK_SECRET;

  let event;

  try {
    event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);
    console.log(event);

    // if (event.type === "charge:pending") {
    //   // received order
    //   // user paid, but transaction not confirm on blockchain yet
    //   console.log("pending payment");
    // }

    // if (event.type === "charge:failed") {
    //   // cancel order
    //   // charge failed or expired
    //   console.log("charge failed");
    // }

    if (event.type === "charge:confirmed") {
      console.log("charge confirme");
    }

    return NextResponse.json({ message: "OK" });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {},
      { status: 500, statusText: "There was an error, please try again" }
    );
  }
}
