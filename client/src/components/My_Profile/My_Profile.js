
import React, {useState, useEffect} from 'react';
import {userInfo,  changeAvatar} from '../../api/index';
import axios from 'axios';

export const My_Profile=()=> {
    let token=JSON.parse(localStorage.getItem('jwt'));
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
    const [id,setId]=useState('');
    const [image,setImage]=useState("");

    const update = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    };
    const btn= async()=> {
        try {
        let response= await userInfo(token.data);
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
    }catch(err){
        console.log(err.response);
    }
}

const save= async()=> {
    try {
        const response = await axios({
            method: 'PATCH',
            url:`http://localhost:10001/api/v1/auth/users/${id}`,
            headers :{
                'Authorization': `Bearer ${token.data}`,
                'Content-Type': 'text/html; charset=utf-8'
            },
            data: JSON.stringify(profileData)
        })
        // JSON.stringify(response.headers);
        console.log(response);
        console.log(response.data);
        console.log(profileData);
    }catch(err){
        console.log(err);
        console.log(err.response);
    }
}
useEffect(()=> {
    btn()
},[]);

const img= async(e)=> {
    try{
        if(e.target.files.length) {
            setImage(e.target.files[0]);
        }
    await changeAvatar(token.data);
    }catch(err){
        console.log(err.response);
    }
}
 

 return(
     <div>My_Profile
        
         {/* <input type="file" id="upload-button"/>
         <img src={img}/> */}
        
     <input type="text" name="email"  value={profileData.email}  />
     {/* /* value={changeProfileData.email} onChange={update} placeholder={profileData.email}} */}
    <br />
    <input type="password" name="password" value={profileData.password} onChange={update} />
    <br />
    <input type="text" name="first_name" value={profileData.first_name} onChange={update} />
    <br />
    <input type="text" name="last_name"  value={profileData.last_name} onChange={update} />
    <br />
    <input type="text" name="birthday" value={profileData.birthday} onChange={update} />
    <br />
    <input type="password" name="repeatPassword" value={profileData.repeatPassword} onChange={update} />
    <br />
    <button onClick={save}>Save</button>
     </div>
 )
}