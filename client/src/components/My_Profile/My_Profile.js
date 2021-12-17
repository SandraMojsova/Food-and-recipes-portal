
import React, { useState, useEffect } from 'react';
import { userInfo, changeAvatar } from '../../api/index';
import axios from 'axios';
import './style.css'
export const My_Profile = () => {
    let token = JSON.parse(localStorage.getItem('jwt'));
    // console.log(token.data);
    const [profileData, setProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
        repeatPassword: ''
    });
    // const [changeProfileData, setChangeProfileData] = useState({
    //     email: '',
    //     password: '',
    //     first_name: '',
    //     last_name: '',
    //     birthday: '',
    //     repeatPassword: ''
    // });
    const [id, setId] = useState('');
    const [image, setImage] = useState("");

    const update = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    };
    const btn = async () => {
        try {
            let response = await userInfo(token.data);
            console.log(response.data);
            console.log(response.data._id);
            setId(response.data._id);
            setProfileData({
                email: response.data.email,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                birthday: response.data.birthday,
                repeatPassword: response.data.repeatPassword
            })
        } catch (err) {
            console.log(err.response);
        }
    }

    const save = async () => {
        try {
            const response = await axios({
                method: 'PATCH',
                url: `http://localhost:10001/api/v1/auth/users/${id}`,
                headers: {
                    'Authorization': `Bearer ${token.data}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ profileData })
            });
            // const response = await axios.patch(`http://localhost:10001/api/v1/auth/users/${id}`, { profileData }, {
            //     headers: {
            //         'Authorization': `Bearer ${token.data}`
            //     }
            // })
            console.log(response);
            console.log(response.data);
            console.log(profileData);
        } catch (err) {
            console.log(err);
            console.log(err.response);
        }
    }
    useEffect(() => {
        btn()
    }, []);

    const img = async (e) => {
        try {
            if (e.target.files.length) {
                setImage(e.target.files[0]);
            }
            await changeAvatar(token.data);
        } catch (err) {
            console.log(err.response);
        }
    }


    return (
        <div id="my-profile">

            <h2>My_Profile</h2>

            <div className="profile-info">
                <div>
                    <input id="button" type="file" id="upload-button" />
                </div>

                <div className="profile-container">
                    <div className="first">
                        <div className="profile">
                            <label for="first_name">First Name</label>
                            <input type="text" name="first_name" value={profileData.first_name} onChange={update} />
                        </div>
                        <div className="profile">
                            <label for="email">Email</label>
                            <input type="text" name="email" value={profileData.email} />
                        </div>
                        <div className="profile">
                            <label for="password">Password</label>
                            <input type="password" name="password" value={profileData.password} onChange={update} />
                        </div>
                        <button onClick={save}>Save</button>
                    </div>
                    <div className="second">
                        <div className="profile">
                            <label for="last_name">Last Name</label>
                            <input type="text" name="last_name" value={profileData.last_name} onChange={update} />
                        </div>
                        <div className="profile">
                            <label for="birthday">Birthday</label>
                            <input type="text" name="birthday" value={profileData.birthday} onChange={update} />
                        </div>
                        <div className="profile">
                            <label for="repeatPassword">Repeat Password</label>
                            <input type="password" placeholder="****" name="repeatPassword" value={profileData.repeatPassword} onChange={update} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}