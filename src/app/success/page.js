"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Success() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("q");
    console.log(search);
    if (search === "paymenterror") {
      toast.error("There was a payment error!");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster position="top-center" richColors />
      <h1 className="text-black">HOME</h1>
    </div>
  );
}
