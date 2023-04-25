import axios from "axios";
import configURL from "../Configurations/configURL";

const {orderRequestURL, savePaymentURL} = configURL;

const generateRequest = async (reqParams) => {
    console.log(reqParams);
    const response = await axios.post(`${orderRequestURL}?amount=${reqParams.amount}&connectionId=${reqParams.connectionId}`)
    console.log(response);
    return response.data
}

const savePayment = async (reqParams) => {
    const response = await axios.post(savePaymentURL, reqParams)
    console.log(response);
    return response.data
}
const exportObject = { generateRequest, savePayment}
export default exportObject