import axios from 'axios';

export const create = (createData) => {
    return axios({
        method: 'POST',
        url: `http://localhost:10001/api/v1/auth/create-account`,
        data: JSON.stringify(createData),
        headers: { 'Content-Type': 'application/json' }
    })
}

export const login = (loginData)=> {
    return axios({
        method: 'POST',
        url: `http://localhost:10001/api/v1/auth/login`,
        data: JSON.stringify(loginData),
        headers: { 'Content-Type': 'application/json' }
    });
}

export const userInfo = (token)=> {
    return axios({
        method: 'GET',
        url:`http://localhost:10001/api/v1/auth/users`,
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateUser = (id , token, profileData)=> {
    return axios({
        method: 'PATCH',
        url:`http://localhost:10001/api/v1/auth/users/${id}`,
        headers :{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(profileData)
    })
}

export const changeAvatar = (token)=> {
    return axios({
        method: 'POST',
        url: 'http://localhost:10002/api/v1/upload',
        headers : {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    })
}
