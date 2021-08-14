import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';


const login = (username, password) => {


    return axios.post("http://localhost:8080/authenticate", { "username": username, "password": password }, { headers: { "Content-Type": "application/json" } })
        .then(user => {

            console.log(user)

            if (user.status == 200) {
                const token = user.data;
                localStorage.setItem("jwtToken", token.jwt);
                setAuthorizationToken(token.jwt);
            }

            return user.data;
        })
        .catch(err => console.log(err));
}

export const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
}

export default login;