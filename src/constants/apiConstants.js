import axios from "axios";
export const ACCESS_TOKEN_NAME = 'login_access_token';

const URL = axios.create({
    baseURL:"http://localhost:8080"
})
export default URL;