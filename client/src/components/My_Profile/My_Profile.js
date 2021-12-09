import React, {useState, useEffect} from 'react';
import {userInfo,updateUserInfo} from '../../api/index';

export const My_Profile=()=> {
    let token=JSON.parse(localStorage.getItem('jwt'));
    //console.log(token.data);
     const [profileData, setProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
    });
    const [changeProfileData, setChangeProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
    });

    const update = (e) => {
    setChangeProfileData({ ...changeProfileData, [e.target.name]: e.target.value })
    };
    const btn= async()=> {
        try {
        let response= await userInfo(token.data);
        console.log(response.data);
        setProfileData({
            email: response.data.email,
        password: response.data.password,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        birthday: response.data.birthday
        })
    }catch(err){
        console.log(err.response);
    }
}

const save= async()=> {
    try {
        let response= await updateUserInfo(changeProfileData, token.data);
        console.log(response.data);
        console.log(response);
        setProfileData({
            first_name: changeProfileData.first_name,
        password: changeProfileData.password
        })
    }catch(err){
        console.log(err.response.data);
    }
}
 useEffect(()=> {
    btn()
 },[]);


 return(
     <div>My_Profile
     {/* <button onClick={btn}>kikli aman</button> */}
     <input type="text" name="email" placeholder={profileData.email} value={changeProfileData.email} onChange={update} />
     {/* value={profileData.email} onChange={createFieldUpdate} */}
    <br />
    <input type="text" name="first_name" placeholder={profileData.first_name} value={changeProfileData.first_name} onChange={update} />
    <br />
    <button onClick={save}>Save</button>
     </div>
 )
}