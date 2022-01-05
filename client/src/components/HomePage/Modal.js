import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export const Modal = ({open,children}) => {
    if (!open) return null;

    return ReactDOM.createPortal(
      <>
         <div className='overlay-styles' />
        <div className='modal-styles'>
          {children}
        </div>
      </>,
      document.getElementById('portal')
    )
}