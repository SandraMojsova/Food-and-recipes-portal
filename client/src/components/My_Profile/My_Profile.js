import React, { useState, useEffect } from 'react';
import { userInfo, updateUser, changeAvatar } from '../../api/index';
import './style.css';
import axios from 'axios';

export const My_Profile = () => {
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
    const [id, setId] = useState('');
    const [image, setImage] = useState("");

    const update = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    };

    const profileInfo = async () => {
        try {
            let response = await userInfo(token);
            setId(response.data._id);
            setProfileData({
                email: response.data.email,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                birthday: response.data.birthday,
                repeat_password: response.data.repeat_password,
                image: response.data.image
            })
        } catch (err) {
            console.log(err.response);
        }
    }
    const profilPic = async () => {
        try {
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
            profileData.image = p;
            console.log(p);
            setProfileData({ ...profileData, image: p })
            console.log(profileData);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

    const save = async (event) => {
        try {
            console.log(profileData);
            console.log(profileData.image);
            const response = await updateUser(id, token, profileData)
            console.log(response);
            console.log(response.data);
        } catch (err) {
            // console.log(err);
            console.log(err.response);
        }
    }
    console.log(profileData);
    const loadImage = (event) => {
        setImage(event.target.files[0]);
    }
    // const [i, setI] = useState(null);
    // const getImg = async () => {
    //     try {
    //         const res = await axios({
    //             method: 'GET',
    //             url: `/api/v1/storage/users/24130093_1895390760475522_13657121933408698_o.jpg`,
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             responseType: 'blob'

    //         })
    //         let r = URL.createObjectURL(res.data)
    //         setI(r);
    //     } catch (err) {
    //         console.log(err.response);
    //     }
    // }
    useEffect(() => {
        profileInfo();
    }, []);
    console.log(profileData.image);
    return (
        <div id="my-profile">
            <div className="my-profile-text">
                <h2 style={{ color: "#96BB36" }}>My Profile</h2>
                <div id="border"></div>
            </div>
            <div className="profile-info">
                <div className='upload-picture'>
                    <img src={`${profileData.image}`} />
                    {/* {image === "" ? <img src={`${profileData.image}`} alt="" />
                        : <img src={image && URL.createObjectURL(image)} alt="" id="profile-image" />
                    } */}
                    <br />
                    <div className='avatar-button'>
                        <label for="upload">Change Avatar</label>
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
                            <label for="password">Password</label>
                            <input type="password" name="password" value={profileData.password} onChange={update} />
                        </div>
                        <button onClick={() => { profilPic(); save(); }} className="save-button">Save</button>
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
                            <label for="repeat_password">Repeat Password</label>
                            <input type="password" placeholder="****" name="repeat_password" value={profileData.repeat_password} onChange={update} />
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}