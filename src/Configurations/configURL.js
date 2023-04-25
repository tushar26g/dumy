// All the Service URL's are to be included here...
let ipAddress = 'localhost'
let portNumber = 5000;
const configURL = {
    loginURL: `http://${ipAddress}:${portNumber}/login`,
    officerLoginURL: `http://${ipAddress}:${portNumber}/officer-login`,
    registerURL: `http://${ipAddress}:${portNumber}/save`,
    addConnectionURL: `http://${ipAddress}:${portNumber}/add-connection`,
    connectionsURL: `http://${ipAddress}:${portNumber}/connections`,
    addBillURL: `http://${ipAddress}:${portNumber}/add-bill`,
    getBillsURL: `http://${ipAddress}:${portNumber}/get-bills`,
    orderRequestURL: `http://${ipAddress}:${portNumber}/order-request`,
    savePaymentURL: `http://${ipAddress}:${portNumber}/save-payment`,
    paymentHistoryURL: `http://${ipAddress}:${portNumber}/payment-history`,
};
export default configURL;