import React, { useState } from "react";
import pizza from "../../images/pizz.png";
import icon_time from "../../images/icon_time.svg";
import icon_plate from "../../images/icon_plate.svg";
import icon_star from "../../images/icon_star.svg";
import icon_arrows from "../../images/icon_arrows_white.svg";
import icon_close from '../../images/icon_close.svg'
import { Modal } from "./Modal";

export const Card = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="card">
      <div className="card">
        <div className="image-container">
          <img src={pizza} alt="" />
          <div className="category">{item.category}</div>
        </div>
        <div className="card-info">
          <h2>{item.recipe_title}</h2>
          <p>{item.short_description}</p>

          <div className="card-container">
            <img src={icon_time} alt="" />
            <span>{item.preparation_time} min</span>
            <img src={icon_plate} alt="" />
            <span>{item.people} persons</span>
            <img src={icon_star} alt="" />
            <span>28</span>
            <div onClick={() => console.log("clicked")}>
              <img
                src={icon_arrows}
                alt=""
                id="icon-arrow"
                onClick={() => setIsOpen(true)}
              />
              <Modal open={isOpen}>
                <div className="title">
                <h2>{item.recipe_title}</h2>
                <img src={icon_close} onClick={() => setIsOpen(false)}/>
                </div>
                <div className="recipe-info-container">
                  <div>
                <img src={pizza} alt="" />
                <h2 id="best-for">Best served for <span>{item.category}</span></h2>
                <p id="description">{item.short_description}</p>
                <div className="card-container">
                <img src={icon_time} alt="" />
                <span>{item.preparation_time} min</span>
                <img src={icon_plate} alt="" />
                <span>{item.people} persons</span>
                <img src={icon_star} alt="" />
                <span>28</span>
                </div>
                </div>
                <p>{item.recipe}</p>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
