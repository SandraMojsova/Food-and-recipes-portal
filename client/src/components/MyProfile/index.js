import React, { useState, useEffect } from 'react';
import { userInfo, updateUser, changeAvatar } from '../../api/users';
import './style.css';
import axios from 'axios';
import img from '../../images/profile-pic.jpg';
import { useAuthContext } from '../Context'

export const MyProfile = () => {
    let token = localStorage.getItem('jwt');

    let { profileData, setProfileData, id } = useAuthContext();

    const [err, setError] = useState(null);

    const update = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    };

    // const profileInfo = async () => {
    //     try {
    //         let response = await userInfo(token);
    //         setId(response.data._id);
    //         setProfileData({
    //             email: response.data.email,
    //             first_name: response.data.first_name,
    //             last_name: response.data.last_name,
    //             image: response.data.image,
    //             birthday: response.data.birthday,
    //         })
    //     } catch (err) {
    //         console.log(err.response);
    //     }
    // }


    const loadImage = async (event) => {
        let image = event.target.files[0];
        const formData = new FormData();
        formData.append('file', image);
        const res = await axios({
            method: 'POST',
            url: `/api/v1/storage/users`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res);
        console.log(res.data);
        let p = res.data.filename;
        setProfileData({ ...profileData, image: p })
    }

    const save = async (event) => {
        try {
            console.log(profileData);
            console.log(profileData.image);
            const response = await updateUser(id, token, profileData)
            console.log(response);
            console.log(response.data);
            window.location.reload();
        } catch (err) {
            // console.log(err);
            setError(err.response.data);
            console.log(err.response);
        }
    }

    // useEffect(() => {
    //     // profileInfo();
    // }, [])
    // console.log(profileData.image);
    return (
        <div id="my-profile">
            <div className="my-profile-text">
                <h2 style={{ color: "#96BB36" }}>My Profile</h2>
                <div id="border"></div>
            </div>
            <div className="profile-info">
                <div className='upload-picture'>
                    <img src={profileData.image ? `${profileData.image}` : img} style={{ widht: "50px", height: "100px" }} />
                    <br />
                    <div className='avatar-button'>
                        <label htmlfor="upload">Change Avatar</label>
                        <input style={{ display: 'none' }} type="file" id="upload" onChange={loadImage} />
                    </div>
                </div>
                <div className="profile-container">
                    <div className="first">
                        <div className="profile">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" value={profileData.first_name} onChange={update} />
                        </div>
                        <div className="profile">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={profileData.email} />
                        </div>
                        <div className="profile">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="****" value={profileData.password} onChange={update} />
                        </div>
                        <button onClick={save} className="save-button">Save</button>
                        {err && <h3 style={{ color: "#8B0000" }}>Error : {err}</h3>}
                    </div>
                    <div className="second">
                        <div className="profile">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" value={profileData.last_name} onChange={update} />
                        </div>
                        <div className="profile">
                            <label htmlFor="birthday">Birthday</label>
                            <input type="text" name="birthday" placeholder="****" value={profileData.birthday} onChange={update} />
                        </div>
                        <div className="profile">
                            <label htmlFor="repeat_password">Repeat Password</label>
                            <input type="password" placeholder="****" name="repeat_password" value={profileData.repeat_password} onChange={update} />
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}