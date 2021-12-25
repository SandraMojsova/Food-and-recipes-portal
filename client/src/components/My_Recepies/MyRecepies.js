import React from 'react';
import './index.css'
import { useHistory } from 'react-router-dom';
import plus from '../../images/icon_plus_white.svg'

export const MyRecepies = () => {
    let history = useHistory();
    const addRecepies = () => {
        history.push('/add-recipe');
    }
    return (
        <div id="my-recepies">
                <div  className="my-recepies-text">
                <h2 style={{ color: "#96BB36" }}>My recepies</h2>
                <div className="border"></div>
                <img src={plus} alt="" className="button-icon" onClick={addRecepies} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Recipe Name</th>
                            <th>Category</th>
                            <th>Created On</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                </table>
        </div>
    )
}