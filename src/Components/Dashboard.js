import React, { useEffect, useState } from 'react'
import './Stylesheets/Dashboard.css'
//import { useNavigate } from 'react-router-dom';
// import connections from '../connection.json';
import image from '../Images/payImage.jpeg'
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import paymentService from '../Services/paymentService';
import customerService from '../Services/CustomerService';
const Dashboard = ({ user }) => {
    const [checkout, setCheckout] = useState(false);
    const [order, setOrder] = useState(null);
    const [reqConnId, setReqConnId] = useState('');
    const [connections, setConnections] = useState([]);
    // const navigate = useNavigate();

    // console.log(user);
    const Razorpay = useRazorpay();

    const handleRequest = param => event => {
        event.preventDefault();
        const reqParams = {
            amount: param.currentDue,
            connectionId: param.connectionsId
        }
        setReqConnId(param.connectionsId);
        //console.log(reqParams);
        paymentRequestHandler(reqParams);

    }
    const paymentRequestHandler = async (reqParams) => {
        try {
            const response = await paymentService.generateRequest(reqParams)
            console.log(response);
            if (response.status === "created") {
                setCheckout(true);
                setOrder(response);
            }
            else {
                alert("Payment Request Failed, Try Again Later...");
                return;
            }
        }
        catch (exception) {
            alert("Failed to Generate Payment Request");
        }
    }
    const paymentResponseHandler = async (reqParams) => {
        // const param = {
        //     "connectionId": reqConnId,
        //     "id": reqParams.id,
        //     "orderId": reqParams.orderId,
        //     "paymentSignature": reqParams.paymentSignature
        // }
        try {
            //console.log("params", reqParams);
            const response = await paymentService.savePayment(reqParams)
            if (response) {
                alert("Payment Details Saved Successfully!, your payment id: " + response);
            }
            else {
                alert("Unable to Save Payment Details in Database, Contact Admin");
                return;
            }
        }
        catch (exception) {
            alert("Failed to Save Payment Details in Database, Contact Admin");
        }
    }
    const handlePayment = useCallback((response, connection) => {
        const options = {
            key: "rzp_test_kRPj6ppuSwuqJP",
            amount: response.amount,
            currency: "INR",
            name: "E-Bill Pay",
            description: "Utility Payment",
            image: image,
            order_id: response.id,
            handler: (res) => {
                console.log(res);
                //alert("(Note for Future Use) Your Payment Id. : " + res.razorpay_payment_id);
                const reqParams = {
                    "connectionId": connection.connectionsId,
                    "id": res.razorpay_payment_id,
                    "orderId": res.razorpay_order_id,
                    "paymentSignature": res.razorpay_signature
                }
                //console.log("ReqParams",reqParams);
                paymentResponseHandler(reqParams);
                setCheckout(false);
                setOrder(null);
                setReqConnId('');
                // window.location.reload(true);
            },
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: `${user.email}`,
                contact: `${user.mobileNumber}`,
            },
            notes: {
                address: "E-Bill Pay",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay]);

    const getConnections = async () => {
        try {
            const response = await customerService.getConnections({ customerId: user.customerId });
            console.log("Connections", response);
            setConnections(response);
        }
        catch (exception) {
            console.log("Failed to Load Connections");
        }
    }

    useEffect(() => {
        getConnections();
    }, []);
    
    return (
        <div>
            <div className='DashboardPage'>
                <div className='DashboardMain container-sm bg bg-white shadow-sm'>
                    <div className='ProfileTitle'>Welcome Back <span className='ProfileName'>{user.firstName} {user.lastName}</span></div>
                    <hr className="hrText" data-content="Profile"></hr>
                    <div className="row align-items-start m-3">
                        <div className="col">
                            <h6 className='h6'><b style={{ color: "navy" }}>Customer Id. </b> : {user.customerId}</h6>
                        </div>
                        <div className="col">
                            <h6 className='h6'><b style={{ color: "navy" }}>Mobile Number </b> : {user.mobileNumber}</h6>
                        </div>
                        <div className="col">
                            <h6 className='h6'><b style={{ color: "navy" }}>Email </b> : {user.email}</h6>
                        </div>
                    </div>
                    <div className="row align-items-start m-3">
                        <div className="col">
                            <h6 className='h6'><b style={{ color: "navy" }}>Address </b> : {user.address}</h6>
                        </div>
                    </div>
                </div>
                <br />
                <div className='container-sm bg bg-white shadow-sm py-3'>
                    <div className="card">
                        <div className="card-header text-center">
                            Your Electricity Connections
                        </div>
                        <div className="card-body">
                            {
                                (connections.length === 0) ?
                                <div className='text-center text-success'>No Power Connections Available</div> :
                                connections.map((connection, index) => {
                                    return (
                                        <div className="card mb-3" style={{ width: "75%", margin: "auto" }}>
                                            <div className="card-body">

                                                <h5 className="card-title text-center h6 my-3">
                                                    <button type="button" className="btn btn-primary" disabled style={{ backgroundColor: "navy", opacity: "70%" }}>
                                                        <span class="spinner-grow spinner-grow-sm" style={{ marginTop: "5px", backgroundColor: "#fff" }}></span>
                                                        Connection Id: &ensp;<span className="badge badge-light" style={{ float: "right", marginTop: "5px", backgroundColor: "#fff", color: "navy" }}> {connection.connectionsId}</span>
                                                    </button>
                                                </h5>
                                                <div className='row'>
                                                    <div className='col col-md-start'>
                                                        <h6 className="card-subtitle mb-2 text-muted">Connection Start Date: {connection.connection_start_date}</h6>
                                                    </div>
                                                    <div className='col col-md-end'>
                                                        <h6 className="card-subtitle mb-2 text-muted">Approved Officer Id.: {connection.approvedOfficer}</h6>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col col-md-start'>
                                                        <h6 className="card-subtitle mb-2 text-muted">Pvs. Bill Date: {connection.pvsBillDate}</h6>
                                                    </div>
                                                    <div className='col col-md-end'>
                                                        <h6 className="card-subtitle mb-2 text-muted">Pvs. Payment Date: </h6> {/* {connection.lastPaidDate}*/}
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col col-md'>
                                                        <h6 className="card-subtitle mb-2 text-muted">Pvs. Paid Amount: </h6> {/*connection.lastPaidAmount*/}
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col col-md-start'>
                                                        <h6 className="card-subtitle mb-2 text-success">Current Due: {connection.currentDue}</h6>
                                                    </div>
                                                    <div className='col col-md-end'>
                                                        <button className="btn btn-link text-primary" onClick={handleRequest(connection)}>Pay Now</button>
                                                    </div>
                                                </div>
                                                {
                                                    (checkout && reqConnId === connection.connectionsId) &&
                                                    <div className='container-sm bg bg-light shadow-sm p-3 rounded'>
                                                        <h4 className='h4 text-warning'>Checkout Now!</h4>
                                                        <p className='text-center text-success fst-italic' style={{ fontFamily: "cursive" }}>(*)Confirm Details Before pressing on Checkout</p>
                                                        <div className='row'>
                                                            <div className='col col-md-start'>
                                                                <h6 className='h6'>Connection Id. {connection.connectionsId}</h6>
                                                            </div>
                                                            <div className='col col-md-end'>
                                                                <h6 className='h6'>Order Id: {order.id}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col col-md-start'>
                                                                <h6 className='h6'>Order Amount: {order.amount / 100} {order.currency}</h6>
                                                            </div>
                                                            <div className='col col-md-end'>
                                                                <h6 className='h6'>Receipt No: {order.receipt}</h6>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col col-md'>
                                                                <h6 className='h6'>Status: {order.status}</h6>
                                                            </div>
                                                        </div>
                                                        <h5 className='text-center'>
                                                            <button className='btn btn-primary btn-block mx-auto' onClick={() => handlePayment(order, connection)}>Checkout</button>
                                                        </h5>

                                                    </div>
                                                }
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className="card-footer text-muted text-center">
                            {connections.length} Active Connections
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard