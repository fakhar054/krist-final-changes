import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import "./PriceSlider.css";

export default function PriceSlider({ minPrice, setMinPrice, setMaxPrice, maxPrice }) {
  const [value, setValue] = useState([minPrice, maxPrice]);

  useEffect(() => {
    if (value[0] !== minPrice || value[1] !== maxPrice) {
      setValue([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  return (
    <div className="slider-container">
      <div className="slider-value">Price: ${value[0]} - ${value[1]}</div>
      <Slider
        className="custom-slider"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
      />
    </div>
  );
}
