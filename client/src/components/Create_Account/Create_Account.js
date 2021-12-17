import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { create } from "../../api/index";
import "./style.css";

export const Create_Account = () => {
  const [createAccountData, setCreateAccountData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
    repeatPassword: "",
  });
  const [err, setError] = useState(null);

  const createFieldUpdate = (e) => {
    setCreateAccountData({
      ...createAccountData,
      [e.target.name]: e.target.value,
    });
  };

  let history = useHistory();
  const createAccBtn = async (e) => {
    e.preventDefault();
    try {
      let res = await create(createAccountData);
      console.log(res);
      if (res.status === 201) {
        history.push("/login");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data);
        // let e = error.response.data;
        // let objKeys = Object.keys(e);
        // for (let item of objKeys) {
        //     console.log(e[item].message);
        //     setError(e[item].message);
        // }
        // if (error.response.data.code === 11000) {
        //     setError('Email already in use');
        // }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div id="create-account">
      <h2>Create Account</h2>
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
          <div>
            <label for="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              value={createAccountData.first_name}
              onChange={createFieldUpdate}
            />
          </div>
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              value={createAccountData.email}
              onChange={createFieldUpdate}
            />
          </div>
          <div>
            <label for="pasword">Password</label>
            <input
              type="password"
              name="password"
              value={createAccountData.password}
              onChange={createFieldUpdate}
            />
          </div>
          <button onClick={createAccBtn}>create account</button>
          </div>
          <div>
          <div>
            <label for="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={createAccountData.last_name}
              onChange={createFieldUpdate}
            />
          </div>
          <div>
            <label for="birthday">Birthday</label>
            <input
              type="text"
              name="birthday"
              value={createAccountData.birthday}
              onChange={createFieldUpdate}
            />
          </div>
          <div>
          <label for="repeat_password">Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              value={createAccountData.repeatPassword}
              onChange={createFieldUpdate}
            />
          </div>
          </div>
        </form>
        {err && <h3>{err}</h3>}
      </div>
    </div>
  );
};
