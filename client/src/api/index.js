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

export const updateUserInfo = (changeProfileData,token)=> {
    return axios({
        method: 'PATCH',
        url:`http://localhost:10001/api/v1/auth/users/:id`,
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(changeProfileData)
    })
}
