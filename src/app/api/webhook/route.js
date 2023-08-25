import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payment = await req.json();

  console.log(payment);

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment.data.id);
      console.log(data);
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "ERROR" });
  }

  return NextResponse.json({ message: "OK" });
}
