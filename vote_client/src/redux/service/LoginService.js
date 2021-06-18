import apiService from './ApiService';
import axios from 'axios';

const CLIENT_ID = "LUvuXWl1NcQ0XnaBe0fIJpZBl7Aa";
const CLIENT_SECRET = "A_cLM0zQTPKLSCcKKV7Mug3LWlAa";

export default {
    doLogin({username, password}) {
        return axios.post("https://citizen.com.vn/oauth2/token",
                {
                    grant_type: "password",
                    username,
                    password
                }, {
                    auth: {
                        username: CLIENT_ID,
                        password: CLIENT_SECRET,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                }
        )
    },
    doLogout() {
        return apiService.post('/api/logout').then((resp) => resp.data);
    },
};
