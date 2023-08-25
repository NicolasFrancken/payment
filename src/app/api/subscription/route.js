import mercadopago from "mercadopago";
import { NextResponse } from "next/server";
import axios from "axios";

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
        notification_url: "https://2662-45-176-89-34.ngrok.io/api/webhook",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer TEST-8758694386882879-082419-5831537b46055c9568c9865013ec300c-1459700923",
        },
      }
    );

    console.log(res.data);

    return NextResponse.json(res.data);
  } catch (e) {
    console.log(e.data);
    return NextResponse.json({ message: "ERROR" });
  }
}

export async function GET(req) {
  mercadopago.configure({
    access_token:
      "TEST-8758694386882879-082419-5831537b46055c9568c9865013ec300c-1459700923",
  });

  try {
    const res = await mercadopago.preapproval.findById(
      "2c9380848a219921018a2dcf199c07d3"
    );
    // const res = await axios.get(
    //   "https://api.mercadopago.com/preapproval/search",
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer TEST-8758694386882879-082419-5831537b46055c9568c9865013ec300c-1459700923",
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
