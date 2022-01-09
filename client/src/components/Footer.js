import React from 'react';
import logo_white from '../images/logo_white.svg';

export const Footer = () => {
    return (
        <div id="footer">
            <img src={logo_white} alt=""/>
            <ul className="footer-list">
                <li>Breakfast</li>
                <li>Brunch</li>
                <li>Lunch</li>
                <li>Dinner</li>
            </ul>
            <p className="footer-copyright">Baby's Food Place<span> copyright &copy; 2021</span></p>
        </div >
    )
}