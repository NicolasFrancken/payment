import mercadopago from "mercadopago";
import { NextResponse } from "next/server";
import axios from "axios";

const MP_TOKEN = process.env.MP_ACCESS_TOKEN;

export async function POST(req) {
  try {
    const res = await axios.post(
      "https://api.mercadopago.com/preapproval",
      {
        reason: "STUDio Premium Plan",
        payer_email: "test_user_1794151742@testuser.com",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          currency_id: "ARS",
          transaction_amount: 999,
        },
        back_url: "https://www.google.com",
        notification_url: "https://af10-45-176-89-34.ngrok.io/api/webhook",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_TOKEN}`,
        },
      }
    );

    console.log("subscription", res.data);

    return NextResponse.json(res.data);
  } catch (e) {
    console.log(e.data);
    return NextResponse.json({ message: "ERROR" });
  }
}

export async function GET(req) {
  mercadopago.configure({
    access_token: MP_TOKEN,
  });

  try {
    const res = await mercadopago.preapproval.findById(
      "2c9380848a2e71f2018a332739a90229"
    );
    // const res = await axios.get(
    //   "https://api.mercadopago.com/preapproval/search",
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //        Authorization: `Bearer ${MP_TOKEN}`,
    //     },
    //   }
    // );

    console.log(res);

    return NextResponse.json({ message: "OK" });
  } catch (e) {
    console.log(e.data);
    return NextResponse.json({ message: "ERROR" });
  }
}
