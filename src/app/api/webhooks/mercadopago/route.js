import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  const MP_TOKEN = process.env.MP_ACCESS_TOKEN;

  mercadopago.configure({
    access_token: MP_TOKEN,
  });

  const payment = await req.json();

  console.log("webhook", payment);

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment.data.id);

      console.log(data);
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {},
      { status: 500, statusText: "There was an error, please try again" }
    );
  }

  return NextResponse.json({ message: "OK" });
}
