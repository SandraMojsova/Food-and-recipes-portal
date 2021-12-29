import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const Context = ({ children }) => {
    let token = localStorage.getItem('jwt');
    const [profileData, setProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
        repeat_password: '',
        image: ''
    });
    const [logged, setLogged] = useState(false);
    axios({
        method: 'GET',
        url: `/api/v1/auth/users`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log(response)
        setProfileData({
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            image: response.data.image,
            birthday: response.data.birthday,
        })

        setLogged(true)
    }).catch(err => {
        console.log(err);
    })

    return (
        <AuthContext.Provider value={{ logged, setLogged, profileData, setProfileData }}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuthContext = () => {
    return useContext(AuthContext);
}
