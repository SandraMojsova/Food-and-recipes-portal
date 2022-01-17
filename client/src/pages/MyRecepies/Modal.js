import React from 'react';
import ReactDOM from 'react-dom';
import { deleteRecipe } from '../../api/recipes';
import './modal.css'

export const Modal = ({setModalOpen,id, setRecipes, recipes})=> {
    console.log(id);
    let token = localStorage.getItem('jwt');

    const removeRecipe = async (id) => {
      let selectedRecipe = recipes.find((recipe) => recipe._id === id);
      try {
          await deleteRecipe(selectedRecipe._id, token)
          setRecipes([...recipes].filter((recipe) => recipe._id !== id));
      } catch (err) {
          console.log(err.response);
      }
  }
    return ReactDOM.createPortal(
        <>
        <div className='other-styles' />
        <div className='recipe-modal'>
          <p>Are you sure you want to delete the recipe?</p>
          <div className='recipes-modal-buttons'>
          <button className='button-confirm' onClick={()=>{removeRecipe(id); setModalOpen(false)}}>DELETE</button>
          <button className='button-cancel'onClick={()=>setModalOpen(false)}>CANCEL</button>
          </div>
       </div>
       </>, document.getElementById('portal-delete')
    )
}