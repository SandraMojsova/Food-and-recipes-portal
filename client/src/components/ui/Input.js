import React from 'react';

export const Input = ({ name, text, type, value, onChange, className, placeholder, inputClassName }) => {
    return (
        <div className={className}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={inputClassName}
            />
        </div>
    )
}