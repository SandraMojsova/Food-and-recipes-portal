import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../api/users';
import './style.css';
import axios from 'axios';
import { useAuthContext } from '../Context';

export const Login = () => {

    const loginDataInit = {
        email: '',
        password: ''
    };
    const [loginData, setLoginData] = useState(loginDataInit);
    const [err, setError] = useState(null);

    let { profileData, setProfileData, logged, setLogged } = useAuthContext();
    console.log(profileData);

    const loginFieldUpdate = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    let history = useHistory();

    const loginBtn = async (e) => {
        e.preventDefault();
        try {
            let res = await login(loginData);
            console.log(res);
            localStorage.setItem('jwt', res.data);
            if(res.status===200) {
            history.push('/my-profile');
            }
        } catch (err) {
            console.log(err.response.data);
            setError(err.response.data);
        }
        // try {
        //     let response = await axios({
        //         method: 'GET',
        //         url: `/api/v1/auth/users`,
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        //         }
        //     })
        //     console.log(response);
        //     setProfileData({
        //                     email: response.data.email,
        //                     first_name: response.data.first_name,
        //                     last_name: response.data.last_name,
        //                     image: response.data.image,
        //                     birthday: response.data.birthday,
        //                 });
        //     setLogged(true);
        //     history.push('/my-profile');
        //     // if(res.status===200) {
        //     // history.push('/my-profile');
        //     // }
        // } catch (err) {
        //     console.log(err);
        // }
    };
    return (
        <div id="login">
            <div className="login">
                <h2>Log In</h2>
                <div id="login-border"></div>
            </div>
            <div>
                <div className="login-container">
                    <div className="login-text">
                        <h2>Welcome to <span style={{ color: "black" }}> Baby's </span></h2>
                        <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    </div>
                    <form method="post" className="formData">
                        <div className="form-container">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="user@domain.com" value={loginData.email} onChange={loginFieldUpdate} />
                        </div>
                        <div className="form-container">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="*******" value={loginData.password} onChange={loginFieldUpdate} />
                        </div>
                        <button id="login-button" onClick={loginBtn}>Log in</button>
                        {err && <h3 style={{ color: "#8B0000" }}>Error : {err}</h3>}
                    </form>
                </div>
            </div>
        </div >
    )
}