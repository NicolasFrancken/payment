import coinbase from "coinbase-commerce-node";
import { NextResponse } from "next/server";

const COINBASE_TOKEN = process.env.COINBASE_TOKEN;
const NGROK_URL = process.env.NGROK_URL;

export async function POST(req) {
  const { email } = await req.json();

  const { Client, resources } = coinbase;

  Client.init(COINBASE_TOKEN);

  try {
    const result = await resources.Charge.create({
      name: "60 Minutes",
      local_price: {
        amount: 0.001,
        currency: "USD",
      },
      pricing_type: "fixed_price",
      redirect_url: `${NGROK_URL}/success`,
      cancel_url: `${NGROK_URL}/failure`,
      metadata: {
        user_id: "12345",
        email: email,
      },
    });

    return NextResponse.json({ result });
  } catch (e) {
    console.log(e);
  }
}
