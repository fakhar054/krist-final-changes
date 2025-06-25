"use client";
import { useState, useEffect } from "react";

const useAllProducts = (page) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/api/front/products?page=${page}`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("Products:  aa hai hai na", result.data);

        setProducts(result.data.data || []);
        setTotalPages(result.data.meta.last_page || 1); // Assuming API provides total pages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // Refetch when page changes

  return { products, loading, error, totalPages };
};

export default useAllProducts;
