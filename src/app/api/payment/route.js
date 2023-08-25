import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(req) {
  mercadopago.configure({
    access_token:
      "TEST-8758694386882879-082419-5831537b46055c9568c9865013ec300c-1459700923",
  });

  const result = await mercadopago.preferences.create({
    items: [{ title: "PC", unit_price: 500, currency_id: "ARS", quantity: 1 }],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/api/failure",
      pending: "http://localhost:3000/api/pending",
    },
    notification_url: "https://2662-45-176-89-34.ngrok.io/api/webhook",
  });
  return NextResponse.json(result.body);
}
