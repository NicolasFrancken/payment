"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/payment", { method: "POST" });

    const data = await response.json();

    console.log(data);
    router.push(data.init_point);
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
