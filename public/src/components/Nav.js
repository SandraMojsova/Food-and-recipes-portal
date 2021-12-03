import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/babys-food-place.png';

export const Nav = () => {
    const history = useHistory();
    return (
        <div id="nav">
            <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
            <ul className="nav_links">
                <li><Link to="/breakfast" style={{ textDecoration: 'none', color: '#A5A5A5' }}> Breakfast</Link></li>
                <li><Link to="/brunch" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Brunch</Link></li>
                <li><Link to="/lunch" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Lunch</Link></li>
                <li><Link to="/dinner" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Dinner</Link></li>
            </ul>
            <div className="nav-buttons">
                <button className="login-button" onClick={() => history.push('/login')}>Log In</button>
                <span className="span">or</span>
                <button className="create-button" onClick={() => history.push('/create-account')}>Create account</button>
            </div>
        </div >
    )
}