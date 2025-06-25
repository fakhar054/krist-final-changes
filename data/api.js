export async function fetchCatalog() {
    const API_URL = "https://led-italia.it/api/catalog";
    const API_TOKEN = "QZ1Wa2COxn5E9OZgTmB1LDdNO6W0PCuajY06oCwdsHD8sR";
    // QZ1Wa2COxn5E9OZgTmB1LDdNO6W0PCuajY06oCwdsHD8sR
  
    try {
      const response = await fetch(`${API_URL}?_token=${API_TOKEN}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Errore API: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.product_list || []; // Verifica se `product_list` è il campo corretto.
    } catch (error) {
      console.error("Errore durante la chiamata API:", error.message);
      return [];
    }
  }
  