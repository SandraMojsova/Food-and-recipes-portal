import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const Create_Account = () => {

    const [createAccountData, setCreateAccountData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
    });
    const [err, setError] = useState(null);

    const createFieldUpdate = (e) => {
        setCreateAccountData({ ...createAccountData, [e.target.name]: e.target.value });
    };

    let history = useHistory();
    const createAccBtn = async (e) => {
        e.preventDefault();
        try {
            let res = await axios({
                method: 'POST',
                url: `http://localhost:10000/api/v1/auth/create-account`,
                data: JSON.stringify(createAccountData),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.status === 201) {
                history.push('/login');
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                let e = error.response.data;
                let objKeys = Object.keys(e);
                for (let item of objKeys) {
                    console.log(e[item].message);
                    setError(e[item].message);
                }
                if (error.response.data.code === 11000) {
                    setError('Email already in use');
                }



                // setError(error.response.data)
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            console.log(error);
        }
    }


    return (
        <div id="create-account">
            <h2>Create Account</h2>
            <div>
                <div>
                    <h2>Create your account</h2>
                    <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>
                <form method="post">
                    <input type="text" name="email" placeholder="email" value={createAccountData.email} onChange={createFieldUpdate} />
                    <br />
                    <input type="password" name="password" placeholder="password" value={createAccountData.password} onChange={createFieldUpdate} />
                    <br />
                    <input type="text" name="first_name" placeholder="first-name" value={createAccountData.first_name} onChange={createFieldUpdate} />
                    <br />
                    <input type="text" name="last_name" placeholder="last_name" value={createAccountData.last_name} onChange={createFieldUpdate} />
                    <br />
                    <input type="text" name="birthday" placeholder="birthday" value={createAccountData.birthday} onChange={createFieldUpdate} />
                    <br />
                    <button onClick={createAccBtn}>create account</button>
                </form>
                {err && <h3>{err}</h3>}

            </div>
        </div>
    )
}