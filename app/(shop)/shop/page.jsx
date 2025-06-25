export default async function ShopPage() {
  let products = [];

  try {
    // Recupera i dati dall'API
    products = await fetchCatalog();
    console.log("Prodotti recuperati:", products);
  } catch (error) {
    console.error("Errore durante il recupero dei dati:", error.message);
  }

  return (
    <>
      <h1>Shop</h1>
      <div>
        {products.length > 0 ? (
          products.map((product) => <p key={product.sku}>{product.description}</p>)
        ) : (
          <p>Nessun prodotto trovato</p>
        )}
      </div>
    </>
  );
}
