import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
import jwt_Decode from 'jwt-decode';
import { BaseURL } from '../helpers/properties';


const login = (username, password) => {

    return axios.post(BaseURL + "/authenticate",
        { "username": username, "password": password },
        { headers: { "Content-Type": "application/json" } })
        .then(user => {

            if (user.status === 200) {
                const token = user.data;
                localStorage.setItem("jwtToken", token.jwt);
                setAuthorizationToken(token.jwt);
                var details = jwt_Decode(user.data.jwt)
                return [true, details];
            }

        })
        .catch(() => false);
}

export const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
}

export default login;