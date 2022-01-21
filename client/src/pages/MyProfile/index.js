import React, { useState } from "react";
import { updateUser, uploadImg } from "../../api/users";
import { Header } from '../../components/ui/Header';
import { Error } from "../../components/ui/Error";
import { Input } from "../../components/ui/Input";
import { Button } from '../.././components/ui/Button';
import img from '../../assets/images/profile-pic.jpg';
import { useAuthContext } from "../../components/Context";
import { token } from '../../const';
import "./style.css";

export const MyProfile = () => {

    let { profileData, setProfileData, id } = useAuthContext();

    const [err, setError] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [image, setImage] = useState('');

    const update = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const uploadAvatar = (event) => {
        setAvatar(URL.createObjectURL(event.target.files[0]))
        setImage(event.target.files[0]);
    }

    const save = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("file", image);
            const result = await uploadImg(formData, token);
            profileData.image = result.data.filename;
        }
        try {
            await updateUser(id, token, profileData);
            window.location.reload();
        } catch (err) {
            setError(err.response.data);
            console.log(err.response);
        }
    };


    return (
        <div id="my-profile">
            <Header text="My Profile" />
            <div className="profile-info">
                <div className="upload-picture">
                    {avatar === null ? <img src={profileData.image ? `${profileData.image}` : img} alt="" />
                        : <img src={avatar} alt="" />
                    }
                    <div className="avatar-button">
                        <label htmlFor="upload">Change Avatar</label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="upload"
                            onChange={uploadAvatar}
                        />
                    </div>
                </div>
                <div className="profile-container">
                    <div className="profile-container-data">
                        <Input name="first_name" type="text" text="First Name" value={profileData.first_name} onChange={update} className="profile" />
                        <Input name="email" type="email" text="Email" value={profileData.email} onChange={update} className="profile" />
                        <Input name="password" type="password" text="Password" placeholder="****" value={profileData.password} onChange={update} className="profile" />
                        <Button onClick={save} className="save-button" text="Save" />
                        {err && <Error err={err} />}
                    </div>
                    <div className="second">
                        <Input name="last_name" type="text" text="Last Name" value={profileData.last_name} onChange={update} className="profile" />
                        <Input name="birthday" type="date" text="Birthday" value={profileData.birthday} onChange={update} className="profile" />
                        <Input name="repeat_password" type="password" placeholder="****" text="Repeat Password" value={profileData.repeat_password} onChange={update} className="profile" />
                    </div>
                </div>
            </div>
        </div>
    );
};
