"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  const handleClick = async () => {
    const res = await axios.post("/api/subscription", {});
    router.push(res.data.init_point);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleClick}
        className="bg-black text-white px-2 py-1 rounded"
      >
        PAY
      </button>
    </div>
  );
}
