// hooks/useStripePublicKey.js
"use client";
import { useEffect, useState } from "react";

export default function useStripePublicKey() {
  const [publicKey, setPublicKey] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const fetchKey = async () => {
      try {
        const res = await fetch(`${baseUrl}api/front/payment-gateways`);
        const json = await res.json();
        console.log(json, "key datatatatat");
        setPublicKey(json?.key); // make sure API returns { key: "pk_test_..." }
      } catch (err) {
        console.error("Failed to load Stripe key", err);
      }
    };

    fetchKey();
  }, []);

  return publicKey;
}
