import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../../../components/ui/Button';
import { deleteRecipe } from '../../../api/recipes';
import { token } from '../../../const';
import './style.css';

export const Modal = ({ setModalOpen, id, setRecipes, recipes }) => {

    const removeRecipe = async (id) => {
        let selectedRecipe = recipes.find((recipe) => recipe._id === id);
        try {
            await deleteRecipe(selectedRecipe._id, token)
            setRecipes([...recipes].filter((recipe) => recipe._id !== id));
        } catch (err) {
            console.log(err.response);
        }
    };

    return ReactDOM.createPortal(
        <>
            <div className='other-styles' />
            <div className='recipe-modal'>
                <p>Are you sure you want to delete the recipe?</p>
                <div className='recipes-modal-buttons'>
                    <Button className='button-confirm' onClick={() => { removeRecipe(id); setModalOpen(false) }} text="DELETE" />
                    <Button className='button-cancel' onClick={() => setModalOpen(false)} text="CANCEL" />
                </div>
            </div>
        </>, document.getElementById('portal-delete')
    )
}