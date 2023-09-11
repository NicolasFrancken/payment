import coinbase from "coinbase-commerce-node";
import { NextResponse } from "next/server";

const COINBASE_TOKEN = process.env.COINBASE_TOKEN;
const NGROK_URL = process.env.NGROK_URL;

export async function POST(req) {
  const { Client, resources } = coinbase;

  Client.init(COINBASE_TOKEN);

  try {
    const result = await resources.Charge.create({
      name: "60 Minutes",
      local_price: {
        amount: 0.2,
        currency: "USD",
      },
      pricing_type: "fixed_price",
      redirect_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000?q=paymenterror`,
      metadata: {
        user_id: "12345",
      },
    });

    return NextResponse.json({ result });
  } catch (e) {
    console.log(e);
  }
}
