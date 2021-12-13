import axios from 'axios';
import { API_URL } from '../data/config';

const InfoService  =  {
    async identity () {
        return await axios.get(API_URL+'api/identity',
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
    async accountInfo () {
        return await axios.get(API_URL+'api/accountInfo',
        {headers: (localStorage.getItem('userAuthDetails')) ?  {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuthDetails')).tokens.access.token}`
        }:{}}
        ).then(function (response) {
            if(parseInt(response.status) === 200) {
                response.flag = true;
            } else if(parseInt(response.status) === 404)  {
                response = "404";
            }
            else {
                response.flag = false;
            }
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
    },
    async transactions (filter) {
        var url;
        if (filter === "limit") {
            url = `limit=5`; 
        }
        else if (filter === "all" ) {
            url = `paginate=false`;
        }
        else {
            url = '';
        }

        return await axios.get(API_URL+'api/transactions?'+url,
        {headers: (localStorage.getItem('userAuthDetails')) ?  {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuthDetails')).tokens.access.token}`
        }:{}}
        ).then(function (response) {
            if(parseInt(response.status) === 200) {
                response.flag = true;
            } else if(parseInt(response.status) === 404)  {
                response = "404";
            }
            else {
                response.flag = false;
            }
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
    }
};

export default InfoService;