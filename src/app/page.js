"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import Tokens from "../components/Tokens";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("q");
    console.log(search);
    if (search === "paymenterror") {
      toast.error("There was a payment error!");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <Toaster position="top-center" richColors />
      <div className="flex ">
        <Tokens />
      </div>
    </div>
  );
}
