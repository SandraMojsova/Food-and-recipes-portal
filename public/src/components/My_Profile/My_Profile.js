import React, {useState} from 'react';
import axios from 'axios';

export const My_Profile=()=> {
    let token=JSON.parse(localStorage.getItem('jwt'));
    console.log(token.data);
     const [profileData, setProfileData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
    });
    // const createFieldUpdate = (e) => {
    //     setProfileData({ ...profileData, [e.target.name]: e.target.value });
    // };

    const btn= async()=> {
        try {
        let response= await axios({
            method: 'GET',
            url:`http://localhost:10000/api/v1/auth/users`,
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.data}`
            }
        })
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
btn();
 return(
     <div>My_Profile
     {/* <button onClick={btn}>kikli aman</button> */}
     <input type="text" name="email" placeholder={profileData.email}  />
     {/* value={profileData.email} onChange={createFieldUpdate} */}
    <br />
    <input type="password" name="password" placeholder={profileData.password}  />
    {/* value={profileData.password} onChange={createFieldUpdate} */}
    <br />
     </div>
 )
}