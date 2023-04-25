import axios from "axios";
import configURL from "../Configurations/configURL";

const {addConnectionURL,addBillURL} = configURL;

const addConnection = async (reqParams) => {
    const response = await axios.post(`${addConnectionURL}?customerId=${reqParams.customerId}&approvedOfficerId=${reqParams.approvedOfficerId}`);
    console.log(response)
    return response.data
}
const addBill = async (reqBody) => {
    const response = await axios.post(addBillURL, reqBody)
    console.log(response);
    return response.data
}
const exportObject = { addConnection, addBill }
export default exportObject