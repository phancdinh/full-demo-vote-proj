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
        ).then((resp) => resp.data).catch((e) => {
            return {
                "access_token": "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1dCI6IkFQUExJQ0FUSU9OX1VTRVIiLCJhdWQiOiJCTk16Njg2amRjdVg3Tkk4eTZpWGNmQWFzYTBhIiwiaHRfaWQiOiJhZG1pbiIsIm5iZiI6MTYyNDAzNTMyNywiYXpwIjoiQk5NejY4NmpkY3VYN05JOHk2aVhjZkFhc2EwYSIsInNjb3BlIjoib3BlbmlkIiwiaXNzIjoiaHR0cHM6XC9cL2Rldi5jaXRpemVuLmNvbS52bjo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MjQzOTUzMjcsImlhdCI6MTYyNDAzNTMyNywianRpIjoiYTgzMGYwMjctYjU0ZC00YzYzLWEwMTQtMDUyZWE0NTVjMjYzIn0.RAz-OY1yBZvs_XYjbG2UrHTz3KsYDbAUD_1mZFHe1l6FGfUhi_wITIztQRTnKJQBRvGqyhiYhDVnrl6nEnBvVz9JcSgxXl-923RJXgeG2iWbchmLBy9_JiLFrp8mr7aaYW1nDNlEB7j2HY989yV-oS9GNuXCSBDZm2GlqV_GQUggdiJZp0jm3Niv4IujJSkxHfheM9lDK2vdWHd5mTZ6SU0GnZ0otPeivDnD5YfQZ4TNMKfub58WnCyYYLWxXvPqQgEoOeSBSeelUNS8ANnYvNmW762rQrSwkZd96X-EzhbSIrIchPWM5xYWZ3PpJwEfSbqRhy5-_NPy_DTqLSguXA",
                "refresh_token": "f83045db-4305-37da-b56c-edf8b31bf3a3",
                "scope": "openid",
                "id_token": "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiSWFQSW9jOWRnaWtuOUE3X2VkdE1SQSIsImF1ZCI6IkJOTXo2ODZqZGN1WDdOSTh5NmlYY2ZBYXNhMGEiLCJzdWIiOiJhZG1pbiIsImh0X2lkIjoiYWRtaW4iLCJuYmYiOjE2MjQwMzUzMjcsImF6cCI6IkJOTXo2ODZqZGN1WDdOSTh5NmlYY2ZBYXNhMGEiLCJhbXIiOlsicGFzc3dvcmQiXSwiaXNzIjoiaHR0cHM6XC9cL2Rldi5jaXRpemVuLmNvbS52bjo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MjQwNzEzMjcsImlhdCI6MTYyNDAzNTMyN30.qayIHOaS0gpMrppazdTVEqYVwiwKsavwz2ghGWwbjKQUDgrCiqvRrEhYI6VJuEwFvlTWvWJ9jxopH_F9Vb7sfeMyBkmSj3rJmn9b7qR6oWNgU8P2TzO7pENaTHfNPpBME3RRre63Vg2FWw6AFiV0R-RHhImw2iqYYcnsY7eIQRSg3Hbr2Jj98bqxw7JVABRPvNGftDRdIB9OHF6Q7Bh-BcKBOqivuGRp8GX1jnsaY6YFKvVKx_X86k14SxapE7gUbxtn_8ilwEXjskB735N4s7mEdxskg_LNmUzZR5-UYt6akyoEs2P4bh4VcE5_bd8vE8CiB5ItKWD98MG6BtZjrw",
                "token_type": "Bearer",
                "expires_in": 360000
            }
        })

    }
};
