"use client";
import "./reviewFilter.css";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

function DropdownMenu({ title, options, onOptionClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left list_item">
      <button onClick={toggleDropdown} className="flex items-center  drop_down">
        {title}
        <RiArrowDropDownLine
          className={`ml-2 transform drop_down_icon ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-48 bg dropdown_menu_list ">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer  "
                onClick={() => onOptionClick(option)}
              >
                <input type="checkbox" className="mr-2" />
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ReviewFilterDropdown() {
  const handleOptionClick = (option) => {
    console.log(`${option} clicked`);
  };

  return (
    <div className="flex flex-col gap-4">
      <DropdownMenu
        title="Media"
        options={["Option 1", "Option 2", "Option 3"]}
        onOptionClick={handleOptionClick}
      />
      <DropdownMenu
        title="Review Topic"
        options={["Red", "Green", "Blue"]}
        onOptionClick={handleOptionClick}
      />
      <DropdownMenu
        title="Rating"
        options={["Small", "Medium", "Large"]}
        onOptionClick={handleOptionClick}
      />
      <DropdownMenu
        title="Filter by Price"
        options={["Under $50", "$50 - $100", "Above $100"]}
        onOptionClick={handleOptionClick}
      />
    </div>
  );
}
