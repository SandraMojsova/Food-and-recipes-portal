import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {login} from '../api/index';

export const Login = () => {

    const loginDataInit = {
        email: '',
        password: ''
    };
    const [loginData, setLoginData] = useState(loginDataInit);
    const [err, setError] = useState(null);

    const loginFieldUpdate = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };
    let history = useHistory();
    const loginBtn = async (e) => {
        e.preventDefault();
        try {
            let res = await login(loginData);
            console.log(res);
            let token = await JSON.stringify(res);
            console.log(token);
            localStorage.setItem('jwt', token);
            if (res.status === 200) {
                history.push('/my-profile');
            }
        } catch (err) {
            console.log(err);
            console.log(err.response);
            // console.log(err.response.data);
            setError(err.response.data);
        }
    };
    return (
        <div id="login">
            <h2>Log In</h2>
            <div>
            <div id="login-container">
                <div id="login-text">
                    <h2>Welcome to <span style={{color: "black"}}> Baby's </span></h2>
                    <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>
                <form>
                    <div id="login-email">
                <label for="email">Email</label>
                    <input type="text" name="email" placeholder="email" value={loginData.email} onChange={loginFieldUpdate} />
                    </div>
                    <br />
                    <div id="login-password">
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="password" value={loginData.password} onChange={loginFieldUpdate} />
                    </div>
                    <br />
                    <button id="login-button" onClick={loginBtn}>Log in</button>
                </form>
                {err && <h3>{err}</h3>}
            </div>
            </div>
        </div>
    )
}