import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const Context = ({ children }) => {
    let token = localStorage.getItem('jwt');
    const [logged, setLogged] = useState(false);
    axios({
        method: 'GET',
        url: `http://localhost:10001/api/v1/auth/users`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        console.log(res);
        setLogged(true)
    }).catch(err => {
        console.log(err);
    })

    return (
        <AuthContext.Provider value={{ logged, setLogged }}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuthContext = () => {
    return useContext(AuthContext);
}
