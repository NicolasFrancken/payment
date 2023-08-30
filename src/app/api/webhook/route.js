import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  mercadopago.configure({
    access_token:
      "TEST-8758694386882879-082419-5831537b46055c9568c9865013ec300c-1459700923",
  });

  const payment = await req.json();

  console.log("webhook", payment);

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment.data.id);

      console.log(data.body.stauts, data.body.transaction_amount);
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
