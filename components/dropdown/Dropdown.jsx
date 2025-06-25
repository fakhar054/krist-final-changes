"use client";
import { useState, useEffect, useContext } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./dropdown.css";
import { ResponseContext } from "@/app/login/ResponseContext";
import Slider from "@mui/material/Slider";
import { useSearchParams } from "next/navigation";

export default function Dropdown() {
  const { filters, setFilters } = useContext(ResponseContext);
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("S");
  const [priceRange, setPriceRange] = useState([20, 10000]);
  const [hasInitializedFromUrl, setHasInitializedFromUrl] = useState(false);
  const [isFilterTouched, setIsFilterTouched] = useState(false);

  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [filterByPrice, setFilterByPrice] = useState(true);
  const [filterByColor, setFilterByColor] = useState(true);
  const [filterBySize, setFilterBySize] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const colors = [
    { name: "Red", code: "#f41c1c" },
    { name: "Blue", code: "#3c34d5" },
    { name: "Green", code: "#007137" },
    { name: "Black", code: "#000000" },
    { name: "Purple", code: "#c12ec8" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // ✅ Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}api/front/categories`);
        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Initialize from searchParams
  useEffect(() => {
    const categoryParam =
      searchParams.get("category") || searchParams.get("category_name");
    const color = searchParams.get("color") || "";
    const size = searchParams.get("size") || "S";
    const min_price = parseInt(searchParams.get("min_price") || "20");
    const max_price = parseInt(searchParams.get("max_price") || "10000");

    if (categoryParam) setSelectedCategory(categoryParam);
    setSelectedColor(color);
    setSelectedSize(size);
    setPriceRange([min_price, max_price]);
    setHasInitializedFromUrl(true);
  }, [searchParams]);

  // ✅ Update URL and filters
  useEffect(() => {
    if (!hasInitializedFromUrl || !isFilterTouched) return;

    const currentParams = new URLSearchParams(window.location.search);

    // Remove `search` only if filters are touched
    currentParams.delete("search");

    if (selectedCategory) {
      currentParams.set("category_name", selectedCategory);
    }

    if (selectedColor) {
      currentParams.set("color", selectedColor);
    }

    if (selectedSize) {
      currentParams.set("size", selectedSize);
    }

    currentParams.set("min_price", priceRange[0]);
    currentParams.set("max_price", priceRange[1]);

    window.history.pushState({}, "", `?${currentParams.toString()}`);

    setFilters({
      category_name: selectedCategory,
      color: selectedColor,
      size: selectedSize,
      min_price: priceRange[0],
      max_price: priceRange[1],
    });
  }, [selectedCategory, selectedColor, selectedSize, priceRange, hasInitializedFromUrl, isFilterTouched]);

  return (
    <div className="Product_Categories">
      {/* Category Filter */}
      <div className="heading_icon" onClick={() => setCategoriesOpen(!categoriesOpen)}>
        <h3>Product Categories</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>

      {categoriesOpen && (
        <ul>
          {loading
            ? [...Array(10)].map((_, index) => (
                <li key={index}>
                  <div
                    className="skeleton-line"
                    style={{
                      height: "18px",
                      width: "80%",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      background: "#e0e0e0",
                    }}
                  ></div>
                </li>
              ))
            : (showAllCategories ? categories : categories.slice(0, 10)).map((category) => (
                <li key={category.id}>
                  <input
                    type="radio"
                    id={category.name}
                    name="category"
                    checked={selectedCategory === category.name}
                    onChange={() => {
                      setSelectedCategory(category.name);
                      setIsFilterTouched(true);
                    }}
                  />
                  <label htmlFor={category.name}>{category.name}</label>
                </li>
              ))}

          {categories.length > 10 && (
            <button
              style={{
                margin: "0px",
                border: "none",
                background: "transparent",
                textDecoration: "underline",
              }}
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? "See Less" : "See More"}
            </button>
          )}
        </ul>
      )}

      {/* Price Filter */}
      <div className="heading_icon" onClick={() => setFilterByPrice(!filterByPrice)}>
        <h3>Filter by Price</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>
      {filterByPrice && (
        <div className="slider-container">
          <div className="slider-value">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </div>
          <Slider
            className="custom-slider"
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            onChangeCommitted={(_, newValue) => {
              setIsFilterTouched(true);
            }}
            valueLabelDisplay="auto"
            min={20}
            max={10000}
          />
        </div>
      )}

      {/* Color Filter */}
      <div className="heading_icon" onClick={() => setFilterByColor(!filterByColor)}>
        <h3>Filter by Color</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>
      {filterByColor && (
        <ul>
          {colors.map((color) => (
            <li key={color.code}>
              <input
                type="radio"
                id={color.code}
                name="color"
                checked={selectedColor === color.code}
                onChange={() => {
                  setSelectedColor(color.code);
                  setIsFilterTouched(true);
                }}
              />
              <label htmlFor={color.code}>{color.name}</label>
            </li>
          ))}
        </ul>
      )}

      {/* Size Filter */}
      <div className="heading_icon" onClick={() => setFilterBySize(!filterBySize)}>
        <h3>Filter by Size</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>
      {filterBySize && (
        <ul>
          {sizes.map((size) => (
            <li key={size}>
              <input
                type="radio"
                id={size}
                name="size"
                checked={selectedSize === size}
                onChange={() => {
                  setSelectedSize(size);
                  setIsFilterTouched(true);
                }}
              />
              <label htmlFor={size}>{size}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
