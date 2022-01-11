import React from 'react';
import { Link, useHistory, NavLink } from 'react-router-dom';
import logo_color from '../images/logo_color.svg';
import { useAuthContext } from './Context';

export const Nav = () => {

    const history = useHistory();
    let { logged, setLogged } = useAuthContext();

    const logoutUser = async () => {
        localStorage.removeItem('jwt');
        setLogged(false);
        history.push('/');
    }

    return (
        <div id="nav">
            <Link to="/"><img className="logo" src={logo_color} alt="logo" /></Link>
            <ul className="nav_links">
                <li><NavLink to="/category/breakfast" activeStyle={{ color: "#F0972A" }}>Breakfast</NavLink></li>
                <li><NavLink to="/category/brunch" activeStyle={{ color: "#F0972A" }}>Brunch</NavLink></li>
                <li><NavLink to="/category/lunch" activeStyle={{ color: "#F0972A" }}>Lunch</NavLink></li>
                <li><NavLink to="/category/dinner" activeStyle={{ color: "#F0972A" }}>Dinner</NavLink></li>
            </ul>
            {logged ? <>
                <ul className='logged-links'>
                    <li><Link to="/my-recepies" style={{ color: "#96BB36" }}> My recepies</Link></li>
                    <li><Link to="/my-profile" style={{ color: "#F0972A" }}>My profile</Link></li>
                    <li><Link to="/" style={{ color: "#B5B5B4" }} onClick={logoutUser}>log out</Link></li>
                </ul> </> : <>
                <div className="nav-buttons">
                    <button className="login-button" onClick={() => history.push('/login')}>Log In</button>
                    <span className="span">or</span>
                    <button className="create-button" onClick={() => history.push('/create-account')}>Create account</button>
                </div>
            </>
            }
        </div >
    )
}