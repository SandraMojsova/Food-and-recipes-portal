import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';

export const C = React.createContext();

export const Context = ({ children }) => {
    // let token = JSON.parse(localStorage.getItem('jwt'));
    const [logged, setLogged] = useState(false);
    console.log(window.location.href);
    // axios({
    //     method: 'GET',
    //     url: `http://localhost:10001/api/v1/auth/users`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token.data}`
    //     }
    // }).then(res => {
    //     console.log(res);
    //     setLogged(true)
    // }).catch(err => {
    //     console.log(err);
    // })
    if (window.location.href === "http://localhost:3000/my-profile") {
        setLogged(true)
    }


    return (
        <C.Provider value={logged}>
            {children}
        </C.Provider>
    )

}

export const NAV = () => {
    return useContext(C);
}

