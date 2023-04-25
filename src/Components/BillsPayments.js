import React from 'react'
import './Stylesheets/BillsPayments.css'
const BillsPayments = ({ user, bills, payments }) => {
    

    console.log("Bills", bills);
    console.log("payments", payments);
    return (
        <div className='BillsPaymentsPage bg bg-light py-2'>
            <div className='container-fluid bg bg-white shadow-sm p-3 mx-auto m-3'>
                <h4 className='h4 text-success text-center'>Bill History</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sl. No.</th>
                            <th scope="col">Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Connection Id.</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Description</th>
                            <th scope="col">Due Days</th>
                            <th scope="col">Officer Id.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bills.map((bill, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{bill.billslogsId}</td>
                                        <td>{bill.date}</td>
                                        <td>{bill.connections.connectionId}</td>
                                        <td>{bill.amount}</td>
                                        {(bill.description) ? <td>{bill.description}</td> : <td className='text-start'>&emsp;&emsp; - </td>}
                                        <td>{bill.duration}</td>
                                        <td>{bill.officerId}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='container-fluid bg bg-white shadow-sm p-3 mx-auto m-3'>
                <h4 className='h4 text-success text-center'>Payment History</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sl. No.</th>
                            <th scope="col">Id.</th>
                            <th scope="col">Connection Id.</th>
                            <th scope="col">Payment Id</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment Signature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{payment.paymentId}</td>
                                        <td>{payment.connectionsPayment.connectionId}</td>
                                        <td>{payment.id}</td>
                                        <td>{payment.orderId}</td>
                                        <td>{payment.date}</td>
                                        <td>{payment.amount/100}</td>
                                        <td>{payment.paymentSignature}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BillsPayments