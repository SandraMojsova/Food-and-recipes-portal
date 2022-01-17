import React, { useState, useContext, useEffect } from 'react';
import { userInfo } from '../../api/users';
import { token } from '../../const';

export const AuthContext = React.createContext();

export const Context = ({ children }) => {

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
    const [id, setId] = useState(null);

    const getU = async () => {
        try {
            let response = await userInfo(token);
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
    };

    useEffect(() => {
        getU();
    }, []);

    return (
        <AuthContext.Provider value={{ logged, setLogged, profileData, setProfileData, id }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}
