"use client";

import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  const handleClick = async () => {
    // const response = await fetch("/api/payment", { method: "POST" });
    // const data = await response.json();
    // console.log(data);
    // router.push(data.init_point);ç

    router.push(
      "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848a223128018a2d94d284075e"
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleClick}
        className="bg-slate-300 text-black px-2 py-1 rounded"
      >
        PAY
      </button>
    </div>
  );
}
