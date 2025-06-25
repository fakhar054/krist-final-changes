export const fetchPopularProducts = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}api/front/popular-products`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    throw new Error(error.message);
  }
};
