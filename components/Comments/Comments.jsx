import React from "react";
import "../../public/assets/css/theme/main.css";
import { FaStar } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import "./comments.css";
import { FaHandPointRight } from "react-icons/fa";

export default function Comments() {
  return (
    <section className="comment">
      <div className="stars_menu_parent_div">
        <div className="stars_div">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="menu_div">
          <IoMdMore className="menu_icon" />
        </div>
      </div>
      <h4>Design & Perofrmance</h4>
      <div className="name_div">
        <h6>Lorem Lipsum</h6>
        <p>27-Feb 2025</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque
        quam sed minus ducimus possimus!
      </p>
      <div className="experince_div mt-2 mb-3 pb-2">
        <FaHandPointRight className="ok_icon" />
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </section>
  );
}
