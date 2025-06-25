"use client";
import { useContextElement } from "@/context/Context";
import React, { useState } from "react";

export default function Pagination({ activePage, setActivePage, totalPages }) {
  // const { catalog } = useContextElement();
  // const itemsPerPage = 15; 
  // const totalItems = catalog.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const [activePage, setActivePage] = useState(1);

  const handleClick = (page) => {
    setActivePage(page);
  };

  // const startIndex = (activePage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const visibleItems = catalog.slice(startIndex, endIndex);

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all page numbers if total pages are 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first 5, last 2, and active page logic
      pages.push(1, 2, 3, 4, 5);
      if (activePage > 5 && activePage < totalPages - 1) {
        pages.push("...");
        pages.push(totalPages - 1, totalPages);
      } else if (activePage >= totalPages - 1) {
        pages.push("...");
        pages.push(totalPages - 1, totalPages);
      } else {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    // <ul>
    //   <li>
    //     <a onClick={() => setActivePage((pre) => (pre == 1 ? 1 : pre - 1))}>
    //       <span className="icon icon-1 unicon-chevron-left rtl:rotate-180" />
    //     </a>
    //   </li>
    //   {[1, 2].map((page) => (
    //     <li key={page}>
    //       <a
    //         className={activePage === page ? "uc-active" : ""}
    //         onClick={() => handleClick(page)}
    //       >
    //         {page}
    //       </a>
    //     </li>
    //   ))}
    //   {activePage > 3 && activePage < 7 && (
    //     <li className="uc-disabled">
    //       <span>…</span>
    //     </li>
    //   )}
    //   {activePage === 3 && (
    //     <li>
    //       <a className={"uc-active"}>3</a>
    //     </li>
    //   )}
    //   {activePage > 3 && activePage < 7 && (
    //     <li>
    //       <a className={"uc-active"}>{activePage}</a>
    //     </li>
    //   )}
    //   <li className="uc-disabled">
    //     <span>…</span>
    //   </li>
    //   {activePage === 7 && (
    //     <li>
    //       <a className={"uc-active"}>7</a>
    //     </li>
    //   )}
    //   {[8, 9].map((page) => (
    //     <li key={page}>
    //       <a
    //         className={activePage === page ? "uc-active" : ""}
    //         onClick={() => handleClick(page)}
    //       >
    //         {page}
    //       </a>
    //     </li>
    //   ))}
    //   <li>
    //     <a onClick={() => setActivePage((pre) => (pre >= 9 ? 9 : pre + 1))}>
    //       <span className="icon icon-1 unicon-chevron-right rtl:rotate-180" />
    //     </a>
    //   </li>
    // </ul>
    <div>
      {/* Render visible items */}
      {/* <ul>
        {visibleItems.map((item, index) => (
          <li key={index}>
            <strong>{item.description}</strong> - {item.category} - $
            {item.price / 100}
          </li>
        ))}
      </ul> */}

      {/* Pagination controls */}
      <ul className="pagination">
        {/* Previous Button */}
        <li>
          <a
            onClick={() => setActivePage((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            <span className="icon icon-1 unicon-chevron-left rtl:rotate-180" />
          </a>
        </li>

        {/* Page numbers */}
        {getPaginationNumbers().map((page, index) =>
          page === "..." ? (
            <li key={index} className="uc-disabled">
              <span>…</span>
            </li>
          ) : (
            <li key={page}>
              <a
                className={activePage === page ? "uc-active" : ""}
                onClick={() => handleClick(page)}
              >
                {page}
              </a>
            </li>
          )
        )}

        {/* Next Button */}
        <li>
          <a
            onClick={() =>
              setActivePage((prev) =>
                prev >= totalPages ? totalPages : prev + 1
              )
            }
          >
            <span className="icon icon-1 unicon-chevron-right rtl:rotate-180" />
          </a>
        </li>
      </ul>
    </div>
  );
}
