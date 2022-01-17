import React, { useState } from 'react';
import { login } from '../../api/users';
import { Header } from '../../components/ui/Header';
import { Error } from '../../components/ui/Error';
import { Input } from '../../components/ui/Input';
import './style.css';

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

    const loginBtn = async (e) => {
        e.preventDefault();
        try {
            let res = await login(loginData);
            localStorage.setItem('jwt', res.data);
            if (res.status === 200) {
                window.location.href = "/my-profile";
            }
        } catch (err) {
            console.log(err.response.data);
            setError(err.response.data);
        }
    };

    return (
        <div id="login">
            <Header text="Log In" />
            <div>
                <div className="login-container">
                    <div className="login-text">
                        <h2>Welcome to <span style={{ color: "black" }}> Baby's </span></h2>
                        <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    </div>
                    <form method="post" className="formData">
                        <Input name="email" text="Email" type="text" placeholder="user@domain.com" value={loginData.email} onChange={loginFieldUpdate} className="form-container" />
                        <Input name="password" text="Password" type="password" placeholder="*******" value={loginData.password} onChange={loginFieldUpdate} className="form-container" />
                        <div>
                            <button id="login-button" onClick={loginBtn}>Log in</button>
                            {err && <Error err={err} />}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}