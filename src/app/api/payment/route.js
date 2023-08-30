import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { quantity } = await req.json();

    if (quantity < 1) {
      return NextResponse.json(
        {},
        { status: 500, statusText: "Cannot buy less than 1 credit" }
      );
    } else if (quantity > 100) {
      return NextResponse.json(
        {},
        { status: 500, statusText: "Cannot buy more than 100 credits" }
      );
    }

    const quantityInt = Number(quantity);

    mercadopago.configure({
      access_token:
        "TEST-8758694386882879-082419-5831537b46055c9568c9865013ec300c-1459700923",
    });

    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Credits",
          unit_price: 700,
          currency_id: "ARS",
          quantity: quantityInt,
        },
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
      },
      notification_url: "https://7493-45-176-89-35.ngrok.io/api/webhook",
      auto_return: "approved",
      binary_mode: true,
    });
    return NextResponse.json(result.body);
  } catch (e) {
    return NextResponse.json(
      {},
      { status: 500, statusText: "There was an error, please try again" }
    );
  }
}
