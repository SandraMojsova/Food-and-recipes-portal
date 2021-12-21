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
        repeat_password: ''
    });
    const [id, setId] = useState('');
    const [image, setImage] = useState("");
    const [uploadFile, setUploadedFile] = useState({});

    const update = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    };

    const profileInfo = async () => {
        try {
            let response = await userInfo(token);
            // console.log(response.data);
            // console.log(response.data._id);
            setId(response.data._id);
            setProfileData({
                email: response.data.email,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                birthday: response.data.birthday,
                repeat_password: response.data.repeat_password
            })
        } catch (err) {
            console.log(err.response);
        }
    }

    const save = async (event) => {
        try {
            const response = await updateUser(id, token, profileData)
            console.log(response);
            console.log(response.data);
            console.log(profileData);
            const formData = new FormData();
            formData.append('file', image);
            console.log(formData);
            const res = await axios({
                method: 'POST',
                url: `http://localhost:10002/api/v1/storage/upload`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res);
            const { filename, filepath } = res.data;
            setUploadedFile({ filename, filepath });

            // const file = await res.json()
            // console.log(file);
        } catch (err) {
            // console.log(err);
            console.log(err.response);
        }
    }
    useEffect(() => {
        profileInfo()
    }, []);

    // const img = async (e) => {
    //     try {
    //         if (e.target.files.length) {
    //             setImage(e.target.files[0]);
    //         }
    //         await changeAvatar(token.data);
    //     } catch (err) {
    //         console.log(err.response);
    //     }
    // }
    const loadImage = (event) => {
        // if (event.target.files && event.target.files[0]) {
        //     setImage({
        //         profile_image: URL.createObjectURL(event.target.files[0])
        //     });
        // }
        setImage(event.target.files[0]);
    }
    console.log(image);
    console.log(uploadFile);
    return (
        <div id="my-profile">
            <div className="my-profile-text">
                <h2 style={{ color: "#96BB36" }}>My Profile</h2>
                <div id="border"></div>
            </div>

            <div className="profile-info">
                <div className='upload-picture'>
                    {
                        uploadFile ?
                            <img src={uploadFile.filepath} alt="" id="profile-image" />
                            : null
                    }
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
                        <button onClick={save} className="save-button">Save</button>
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
            </div>
        </div>
    )
}