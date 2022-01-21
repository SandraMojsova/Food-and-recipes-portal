import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { create } from "../../api/users";
import { Header } from '../../components/ui/Header';
import { Error } from "../../components/ui/Error";
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import "./style.css";

export const CreateAccount = () => {

    const [createAccountData, setCreateAccountData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: "",
        repeat_password: "",
    });
    const [err, setError] = useState(null);

    const createFieldUpdate = (e) => {
        setCreateAccountData({
            ...createAccountData,
            [e.target.name]: e.target.value,
        });
    };

    let history = useHistory();

    const createAccountBtn = async (e) => {
        e.preventDefault();
        try {
            let response = await create(createAccountData);
            if (response.status === 201) {
                history.push("/login");
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data);
        }
    };

    return (
        <div id="create-account">
            <Header text="Create Account" />
            <div className="container">
                <div className="create-account-info">
                    <h2>
                        Create your <span style={{ color: "#626262" }}>account</span>
                    </h2>
                    <p>
                        All the Lorem Ipsum generators on the Internet tend to repeat
                        predefined chunks as necessary, making this the first true generator
                        on the Internet. It uses a dictionary of over 200 Latin words,
                        combined with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
                        therefore always free from repetition, injected humour, or
                        non-characteristic words etc.
                    </p>
                </div>
                <form method="post" className="form">
                    <div>
                        <Input name="first_name" text="First Name" type="text" value={createAccountData.first_name} onChange={createFieldUpdate} />
                        <Input name="email" text="Email" type="text" value={createAccountData.email} onChange={createFieldUpdate} />
                        <Input name="password" text="Password" type="password" value={createAccountData.password} onChange={createFieldUpdate} />
                        <Button onClick={createAccountBtn} text="create account" className="create-account-btn" />
                        {err && <Error err={err} />}
                    </div>
                    <div>
                        <Input name="last_name" text="Last Name" type="text" value={createAccountData.last_name} onChange={createFieldUpdate} />
                        <Input name="birthday" text="Birthday" type="date" value={createAccountData.birthday} onChange={createFieldUpdate} />
                        <Input name="repeat_password" text="Repeat Password" type="password" value={createAccountData.repeat_password} onChange={createFieldUpdate} />
                    </div>
                </form>
            </div>
        </div>
    );
};
