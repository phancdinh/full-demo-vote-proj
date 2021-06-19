import axios from 'axios';

const CLIENT_ID = "BNMz686jdcuX7NI8y6iXcfAasa0a";
const CLIENT_SECRET = "IJMrrKN6yi1nGoeglFVYd_nq1JQa";

export default {
    doLogin({username, password}) {
        const params = new URLSearchParams()
        params.append("grant_type", "password");
        params.append("username", username);
        params.append("password", password);
        return axios.post("https://dev.citizen.com.vn/oauth2/token",
                params, {
                    auth: {
                        username: CLIENT_ID,
                        password: CLIENT_SECRET,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                }
        ).then((resp) => resp.data);
    }
};
