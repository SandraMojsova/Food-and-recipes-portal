import React, { useState, useEffect } from "react";
import { updateUser, userInfo , uploadImg } from "../../api/users";
import "./style.css";
import img from "../../images/profile-pic.jpg";
import { useAuthContext } from "../../components/Context";

export const MyProfile = () => {
    let token = localStorage.getItem("jwt");

    let { profileData, setProfileData, id} = useAuthContext();

    const [err, setError] = useState(null);

    const update = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const uploadImage = async (event) => {
        let image = event.target.files[0];
        const formData = new FormData();
        formData.append("file", image);
        const result = await uploadImg(formData, token);
        let img = result.data.filename;
        setProfileData({ ...profileData, image: img });
    };
  
    const save = async () => {
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
            <div className="my-profile-text">
                <h2>My Profile</h2>
                <div id="border"></div>
            </div>
            <div className="profile-info">
                <div className="upload-picture">
                <img src={profileData.image ? `${profileData.image}` : img} />
                    <div className="avatar-button">
                        <label htmlFor="upload">Change Avatar</label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="upload"
                            onChange={uploadImage}
                        />
                    </div>
                </div>
                <div className="profile-container">
                    <div className="profile-container-data">
                        <div className="profile">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={profileData.first_name}
                                onChange={update}
                            />
                        </div>
                        <div className="profile">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={profileData.email} />
                        </div>
                        <div className="profile">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="****"
                                value={profileData.password}
                                onChange={update}
                            />
                        </div>
                        <button onClick={save} className="save-button">
                            Save
                        </button>
                        {err && <h3 style={{ color: "#8B0000" }}>Error : {err}</h3>}
                    </div>
                    <div className="second">
                        <div className="profile">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={profileData.last_name}
                                onChange={update}
                            />
                        </div>
                        <div className="profile">
                            <label htmlFor="birthday">Birthday</label>
                            <input
                                type="date"
                                name="birthday"
                                placeholder="****"
                                value={profileData.birthday}
                                onChange={update}
                            />
                        </div>
                        <div className="profile">
                            <label htmlFor="repeat_password">Repeat Password</label>
                            <input
                                type="password"
                                placeholder="****"
                                name="repeat_password"
                                value={profileData.repeat_password}
                                onChange={update}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
