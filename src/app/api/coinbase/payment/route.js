import coinbase from "coinbase-commerce-node";
import { NextResponse } from "next/server";

const COINBASE_TOKEN = process.env.COINBASE_TOKEN;

export async function POST(req) {
  const { quantity } = await req.json();

  const { Client, resources } = coinbase;

  Client.init(COINBASE_TOKEN);

  try {
    const result = await resources.Charge.create({
      name: "Credits",
      description: "1 credit = 60 mins",
      local_price: {
        amount: 0.01,
        currency: "USD",
      },
      pricing_type: "fixed_price",
      redirect_url: "http://localhost/success",
    });

    return NextResponse.json({ result });
  } catch (e) {
    console.log(e);
  }
}
