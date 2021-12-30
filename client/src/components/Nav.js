import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo_color from '../images/logo_color.svg';
import { useAuthContext } from './Context';

export const Nav = () => {
    const history = useHistory();
    let { logged, setLogged } = useAuthContext();
    //console.log(logged);
    const logoutUser = () => {
        localStorage.removeItem('jwt');
        setLogged(false);
        history.push('/');
    }

    return (
        <div id="nav">
            <Link to="/"><img className="logo" src={logo_color} alt="logo" /></Link>
            <ul className="nav_links">
                <li><Link to="/breakfast" style={{ textDecoration: 'none', color: '#A5A5A5' }}> Breakfast</Link></li>
                <li><Link to="/brunch" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Brunch</Link></li>
                <li><Link to="/lunch" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Lunch</Link></li>
                <li><Link to="/dinner" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Dinner</Link></li>
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