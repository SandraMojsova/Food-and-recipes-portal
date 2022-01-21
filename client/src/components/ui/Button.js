import React from 'react';

export const Button = ({ text, onClick, className, id }) => {
    return <button id={id} className={className} onClick={onClick}>{text}</button>
}