import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/babys-food-place.png';
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
            <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
            <ul className="nav_links">
                <li><Link to="/breakfast" style={{ textDecoration: 'none', color: '#A5A5A5' }}> Breakfast</Link></li>
                <li><Link to="/brunch" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Brunch</Link></li>
                <li><Link to="/lunch" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Lunch</Link></li>
                <li><Link to="/dinner" style={{ textDecoration: 'none', color: '#A5A5A5' }}>Dinner</Link></li>
            </ul>
            {logged ? <>
                <ul>
                    <li><Link to="/my-recepies"> My recepies</Link></li>
                    <li><Link to="/my-profile">My profile</Link></li>
                    <li><Link to="/" onClick={logoutUser}>log out</Link></li>
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