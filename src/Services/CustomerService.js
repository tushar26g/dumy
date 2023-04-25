import axios from "axios";
import configURL from "../Configurations/configURL";

const {connectionsURL,getBillsURL,paymentHistoryURL} = configURL;

const getConnections = async (reqParams) => {
    const response = await axios.get(`${connectionsURL}?customerId=${reqParams.customerId}`);
    console.log(response)
    return response.data
}
const getBills = async (reqParams) => {
    console.log(reqParams)
    const response = await axios.get(`${getBillsURL}?customerId=${parseInt(reqParams.customerId)}`);
    console.log(response)
    return response.data
}
const getPaymentHistory = async (reqParams) => {
    console.log(reqParams)
    const response = await axios.get(`${paymentHistoryURL}?customerId=${parseInt(reqParams.customerId)}`);
    console.log(response)
    return response.data
}

const exportObject = { getConnections, getBills, getPaymentHistory}
export default exportObject