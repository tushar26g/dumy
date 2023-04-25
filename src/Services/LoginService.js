import axios from "axios";
import configURL from "../Configurations/configURL";

const {loginURL,officerLoginURL,registerURL} = configURL;

const login = async (loginCredentials) => {
    const response = await axios.post(`${loginURL}?userName=${loginCredentials.userName}&password=${loginCredentials.password}`);
    console.log(response)
    return response.data
}
const officerLogin = async (loginCredentials) => {
    const response = await axios.post(`${officerLoginURL}?userName=${loginCredentials.userName}&password=${loginCredentials.password}`);
    console.log(response)
    return response.data
}

const register = async (reqBody) => {
    const response = await axios.post(registerURL, reqBody)
    console.log(response);
    return response.data
}
const exportObject = { login, officerLogin, register }
export default exportObject