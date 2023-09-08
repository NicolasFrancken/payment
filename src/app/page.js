"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Tokens from "../components/Tokens";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "/api/coinbase/payment",
        {
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(res.data);
      router.push(res.data.result.hosted_url);
    } catch (e) {
      setErrorMessage(e.response.statusText);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="flex ">
        {/* <button
          onClick={handleClick}
          className="bg-gray-800 text-white px-2 py-1 rounded h-8 w-16 ml-1 text-semibold"
        >
          PAY
        </button> */}
        <Tokens />
      </div>
      {errorMessage ? (
        <label className="text-red-500 pt-2 text-semibold">
          {errorMessage}
        </label>
      ) : (
        ""
      )}
    </div>
  );
}
