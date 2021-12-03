import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
            let res = await axios({
                method: 'POST',
                url: `http://localhost:10000/api/v1/auth/login`,
                data: JSON.stringify(loginData),
                headers: { 'Content-Type': 'application/json' }
            });
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
            console.log(err.response.data);
            setError(err.response.data);
        }
    };
    return (
        <div id="login">
            <h2>Log In</h2>
            <div>
                <div>
                    <h2>Welcome to Baby's</h2>
                    <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>
                <form>
                    <input type="text" name="email" placeholder="email" value={loginData.email} onChange={loginFieldUpdate} />
                    <br />
                    <input type="password" name="password" placeholder="password" value={loginData.password} onChange={loginFieldUpdate} />
                    <br />
                    <button onClick={loginBtn}>Log in</button>
                </form>
                {err && <h3>{err}</h3>}
            </div>
        </div>
    )
}