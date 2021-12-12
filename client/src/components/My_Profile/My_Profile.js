import fileUpload from 'express-fileupload';
import req from 'express/lib/request';
import React, {useState, useEffect} from 'react';
import {userInfo,updateUserInfo, changeAvatar} from '../../api/index';

export const My_Profile=()=> {
    let token=JSON.parse(localStorage.getItem('jwt'));
    //console.log(token.data);
     const [profileData, setProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
        repeatPassword: ''
    });
    const [changeProfileData, setChangeProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
        repeatPassword: ''
    });
    const [id,setId]=useState('');
    const [image,setImage]=useState("");

    const update = (e) => {
        setChangeProfileData({ ...changeProfileData, [e.target.name]: e.target.value })
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
        
        // console.log(response);
        setChangeProfileData({
            email: changeProfileData.email ? changeProfileData.email : profileData.email ,
        password: changeProfileData.password ? changeProfileData.password : profileData.password,
        first_name: changeProfileData.first_name ? changeProfileData.first_name : profileData.first_name,
        last_name: changeProfileData.last_name ? changeProfileData.last_name : profileData.last_name,
        birthday: changeProfileData.birthday ? changeProfileData.birthday : profileData.birthday,
        repeatPassword: changeProfileData.repeatPassword ? changeProfileData.repeatPassword : profileData.repeatPassword
        })
        setProfileData(changeProfileData);
        let response= await updateUserInfo(changeProfileData, token.data,id);
        console.log(response.data);
        // setProfileData({
        //     email: changeProfileData.email,
        // password: changeProfileData.password,
        // first_name: changeProfileData.first_name,
        // last_name: changeProfileData.last_name ,
        // birthday: changeProfileData.birthday ,
        // repeatPassword: changeProfileData.repeatPassword 
        // })
    }catch(err){
        console.log(err);
        console.log(err.response);
    }
}

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
 useEffect(()=> {
    btn()
 },[]);


 return(
     <div>My_Profile
        
         <input type="file" id="upload-button"/>
         <img src={img}/>
        
     <input type="text" name="email" placeholder={profileData.email} value={changeProfileData.email} onChange={update} />
    <br />
    <input type="password" name="password" placeholder={profileData.password} value={changeProfileData.password} onChange={update} />
    <br />
    <input type="text" name="first_name" placeholder={profileData.first_name} value={changeProfileData.first_name} onChange={update} />
    <br />
    <input type="text" name="last_name" placeholder={profileData.last_name} value={changeProfileData.last_name} onChange={update} />
    <br />
    <input type="text" name="birthday" placeholder={profileData.birthday} value={changeProfileData.birthday} onChange={update} />
    <br />
    <input type="password" name="repeatPassword" placeholder={profileData.repeatPassword} value={changeProfileData.repeatPassword} onChange={update} />
    <br />
    <button onClick={save}>Save</button>
     </div>
 )
}