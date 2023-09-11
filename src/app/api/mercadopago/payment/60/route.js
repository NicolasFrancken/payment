import mercadopago from "mercadopago";
import { NextResponse } from "next/server";

const MP_TOKEN = process.env.MP_ACCESS_TOKEN;
const NGROK_URL = process.env.NGROK_URL;
const USD = process.env.USD;

export async function POST(req) {
  try {
    const { email } = await req.json();
    const userId = "12345";

    // if (quantity < 1) {
    //   return NextResponse.json(
    //     {},
    //     { status: 500, statusText: "Cannot buy less than 1 credit" }
    //   );
    // } else if (quantity > 100) {
    //   return NextResponse.json(
    //     {},
    //     { status: 500, statusText: "Cannot buy more than 100 credits" }
    //   );
    // }

    // const quantityInt = Number(quantity);

    mercadopago.configure({
      access_token: MP_TOKEN,
    });

    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "60 Minutes",
          unit_price: 1.5 * USD,
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      back_urls: {
        success: "http://localhost:3000",
        failure: "http://localhost:3000?q=paymenterror",
      },
      metadata: {
        email: email,
        user_id: userId,
      },
      notification_url: `${NGROK_URL}/api/webhooks/mercadopago`,
      auto_return: "all",
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
