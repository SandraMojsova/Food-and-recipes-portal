import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const Context = ({ children }) => {
    let token = localStorage.getItem('jwt');
    const [logged, setLogged] = useState(false);
    const [id, setId] = useState(null);
    const [profileData, setProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
        repeat_password: '',
        image: ''
    });

    const getU = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/v1/auth/users`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response);
            setProfileData({
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                birthday: response.data.birthday.substring(0, 10),
                image: response.data.image,
            })
            setLogged(true);
            setId(response.data._id);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(async () => {
        getU();
    }, []);
    // console.log(profileData);
    return (
        <AuthContext.Provider value={{ logged, setLogged, profileData, setProfileData }}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuthContext = () => {
    return useContext(AuthContext);
}
