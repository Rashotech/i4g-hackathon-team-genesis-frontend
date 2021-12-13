import axios from 'axios';
import { API_URL } from '../data/config';

const AuthService  =  {
    // User Authentication
    async authLogin (data) {
        return await axios.post(API_URL+'api/auth/login', {
            email : data.email,
            password: data.password,  
        }).then(function (response) {
            if(parseInt(response.status) === 200) {
                localStorage.removeItem('userAuthDetails');
                response.flag = true;
                localStorage.setItem("userAuthDetails", JSON.stringify(response.data));
            } else {
                response.flag = false;
            }
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
    },

    async accountLink (token) {
        return await axios.post(API_URL+'api/monoAuth', {
            code: token
        },
        {headers: (localStorage.getItem('userAuthDetails')) ?  {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuthDetails')).tokens.access.token}`
        }:{}}
        ).then(function (response) {
            if(parseInt(response.status) === 200) {
                response.flag = true;
            } else {
                response.flag = false;
            }
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
    },

    // Check User Session in storage
    async checkUserSession () {
        return await localStorage.getItem('userAuthDetails') !== null;
    },

    // Check Account linking
    async CheckLink () {
        return await axios.get(API_URL+'api/localinfo',
        {headers: (localStorage.getItem('userAuthDetails')) ?  {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuthDetails')).tokens.access.token}`
        }:{}}
        ).then(function (response) {
            if(parseInt(response.status) === 200) {
               if(response.data.monoStatus === true) {
                    return "linked"
               }
            } else {
                return "notlinked";
            }
        })
        .catch(function (error) {
            return "notlinked";
        });
    },

    // Destroy User Session
    async userLogout () {
        localStorage.removeItem('userAuthDetails');
    },

    //User Registration
    async userRegistration (data) {
        return await axios.post(API_URL+'api/auth/register', data).then(function (response) {
            if(parseInt(response.status) === 201) {
                response.flag = true;
            }
            return response;
        })
        .catch(function (error) {
            return error.response.data;
        });
    }
};

export default AuthService;