"use client";
import { useState } from "react";

const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const latestCategories = async (userId) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}api/front/latest/categories`);
      //   console.log(res, "res cate ka")
      const data = await res.json();
      console.log(data, "res cate ka");
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { latestCategories, loading, error };
};

export default useCategories;
