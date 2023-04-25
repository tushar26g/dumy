import React, { useState } from 'react'
import './Stylesheets/Dashboard.css'
import OfficerService from '../Services/OfficerService'
const OfficerDashboard = ({ user }) => {
    const [customerId, setCustomerId] = useState('');
    const [connectionId, setConnectionId] = useState('');
    const [duration, setDuration] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState('');
    const addConnectionRequestHandler = async (requestParams) => {
        try {
          const response = await OfficerService.addConnection(requestParams)
          if (response) {
            alert("Operation Successful!, Connection Id: "+response);
          }
          else{
            alert("Operation Failed!, Unable to Add Connection Try Later");
          }
          
        }
        catch (exception) {
            alert("Operation Failed!, Invalid Details, Try Again");
        }
      }
    const handleAddConnectionRequest = (event) => {
        event.preventDefault(true)
        const requestParams = {
            customerId:parseInt(customerId), approvedOfficerId: user.officerId
        }
        console.log(requestParams)
        addConnectionRequestHandler(requestParams)
        setCustomerId('')
    }
    const addBillRequestHandler = async (requestParams) => {
        try {
          const response = await OfficerService.addBill(requestParams)
          if (response) {
            alert("Operation Successful!, Bill Id: "+response);
          }
          else{
            alert("Operation Failed!, Unable to Add Bill Try Later");
          }
          
        }
        catch (exception) {
            alert("Operation Failed!, Invalid Details, Try Again");
        }
      }
    const handleAddBillRequest = (event) => {
        event.preventDefault(true)
        if(amount <= 0 || connectionId <= 0 || duration <= 0 || description === ""){
            alert("All Fields are Necessary!");
            return;
        }
        const requestParams = {
            "connectionsId": connectionId,
            "amount": amount,
            "officerId": user.officerId,
            "duration": duration,
            "description": description
        }
        console.log(requestParams)
        addBillRequestHandler(requestParams)
        setAmount('');
        setConnectionId('');
        setDescription('');
        setDuration('');
    }
    return (
        <div className='DashboardPage'>
            <div className='DashboardMain container-sm bg bg-white shadow-sm'>
                <div className='ProfileTitle'>Welcome Back <span className='ProfileName'>{user.officerName}</span></div>
                <hr className="hrText" data-content="Profile"></hr>
                <div className="row align-items-start m-3">
                    <div className="col">
                        <h6 className='h6'><b style={{ color: "navy" }}>Officer Id. </b> : {user.officerId}</h6>
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
                        <h6 className='h6'><b style={{ color: "navy" }}>Area </b> : {user.area}</h6>
                    </div>
                    <div className="col">
                        <h6 className='h6'><b style={{ color: "navy" }}>Role </b> : {user.role}</h6>
                    </div>
                    <div className="col">
                        <h6 className='h6'><b style={{ color: "navy" }}></b></h6>
                    </div>
                </div>
            </div>
            <br />
            <div className='container-sm bg bg-white shadow-sm py-3 my-1'>
                <h4 className='h5 text-center text-success'>Add New Connection</h4>
                <hr />
                <form className='my-1' onSubmit={handleAddConnectionRequest}>
                    <div className='input-group' style={{ width: "50%", margin: "auto" }}>
                        <label class="control-label mx-3 mt-2" for="input1">Customer Id : </label>
                        <input type='text' placeholder='Customer Id.' id='input1' className='form-control' value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
                        <input type="submit" name='Submit' className='btn btn-primary form-control mx-2' />
                    </div>
                </form>
            </div>
            <div className='container-sm bg bg-white shadow-sm py-3 my-1'>
                <h4 className='h5 text-center text-success'>Add Power Bill</h4>
                <hr />
                <form className='my-1' onSubmit={handleAddBillRequest}>
                    <div className='input-group' style={{ width: "80%", margin: "auto" }}>
                        <input type='text' placeholder='Connection Id.' id='input1' className='form-control' value={connectionId} onChange={(e) => setConnectionId(e.target.value)} required />
                        <input type='number' placeholder='Amount' id='input1' className='form-control' value={amount} onChange={(e) => setAmount(e.target.value)} required />
                        <input type='number' placeholder='Duration' id='input1' className='form-control' value={duration} onChange={(e) => setDuration(e.target.value)} required />
                        <input type='text' placeholder='Description' id='input1' className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <input type="submit" name='Submit' className='btn btn-primary form-control mx-2' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OfficerDashboard