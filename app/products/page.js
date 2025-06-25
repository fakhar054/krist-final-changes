import { fetchCatalog } from "@/data/api";

export default async function ProductsPage() {
  const products = await fetchCatalog();

  return (
    <div>
      <h1>Lista dei Prodotti</h1>
      {products && products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div
              key={product.sku}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <h2>{product.description}</h2>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Prezzo:</strong> €{(product.price / 100).toFixed(2)}</p>
              <p><strong>Categoria:</strong> {product.category}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p>
                <strong>Disponibilità:</strong>{" "}
                {product.availability.quantity > 0
                  ? `${product.availability.quantity} disponibili`
                  : "Non disponibile"}
              </p>
              {product.energy_image && (
                <img
                  src={product.energy_image}
                  alt={product.description}
                  style={{ maxWidth: "150px", marginTop: "8px" }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Nessun prodotto trovato o errore nel caricamento dei dati.</p>
      )}
    </div>
  );
}
