import React from 'react';

export const Footer = () => {
    return (
        <div id="footer">
            <p className="footer-logo">
                <span id="logo-babys">Baby's</span>
                <span id="logo">food place</span>
            </p>
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