import React, { useState } from "react";
import pizza from "../../images/pizz.png";
import icon_time from "../../images/icon_time.svg";
import icon_plate from "../../images/icon_plate.svg";
import icon_star from "../../images/icon_star.svg";
import icon_arrows from "../../images/icon_arrows_white.svg";
import icon_close from '../../images/icon_close.svg'
import { Modal } from "./Modal";
import axios from 'axios';

export const Card = ({ item, likePost}) => {
  // let token = localStorage.getItem('jwt');
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card-main-box">
      <div className="card">
        <div className="image-container">
          <img src={item.image} alt="" />
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
            <img src={icon_star} alt="" onClick={()=> likePost(item._id)}/>
            <span>{item.likes.length}</span>
            <div onClick={() => console.log("clicked")} className="arrow-button-box">
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
                  <div className="recipe-info-box">
                <img src={item.image} alt="" className="recipe-info-box-img"/>
                <h2 className="best-for">Best served for <span>{item.category}</span></h2>
                <p id="description">{item.short_description}</p>
                <div className="card-container">
                <img src={icon_time} alt="" />
                <span>{item.preparation_time} min</span>
                <img src={icon_plate} alt="" />
                <span>{item.people} persons</span>
                <img src={icon_star} alt=""/>
                <span>{item.likes.length}</span>
                </div>
                </div>
                <div className="recipe-details-box">
                  <span>Recipe Details</span>
                <p>{item.recipe}</p>
                </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
