import React from 'react';

export const Header = ({ text }) => {
    return (
        <div className="header">
            <h2>{text}</h2>
            <div className="header-border"></div>
        </div>
    )
}