import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

const MP_TOKEN = process.env.MP_ACCESS_TOKEN;
const NGROK_URL = process.env.NGROK_URL;

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
      access_token: MP_TOKEN,
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
      metadata: {
        custom_field: "COOKIE",
      },
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
      },
      notification_url: `${NGROK_URL}/api/mercadopago/webhook`,
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
