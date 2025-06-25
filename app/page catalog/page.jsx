"use client";
import React, { useEffect, useState } from "react";
import { fetchCatalog } from "@/data/api"; // Importa la funzione API

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chiamata alla funzione API
    async function getProducts() {
      try {
        const data = await fetchCatalog();
        if (data) {
          setProducts(data.product_list || []); // Supponendo che i prodotti siano in `product_list`
        }
      } catch (err) {
        setError("Errore durante il caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  // Render del contenuto
  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Catalogo Prodotti</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.name}</h2>
            <img src={product.image_url} alt={product.name} width={200} />
            <p>Prezzo: {product.price} €</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
