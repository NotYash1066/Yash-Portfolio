"use client";

import { useEffect, useState } from "react";
import { profile } from "@/config/profile";

export function RandomQuote() {
  const [quote, setQuote] = useState(profile.quotes[0]);

  useEffect(() => {
    const { quotes } = profile;
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  return <>{quote}</>;
}
