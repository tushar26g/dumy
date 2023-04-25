import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './Components/AboutPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
// import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import AuthPage from './Components/AuthPage';
import loginService from './Services/LoginService';
import BillsPayments from './Components/BillsPayments';
import customerService from './Services/CustomerService';
import OfficerDashboard from './Components/OfficerDashboard';
function App() {
  const [userType, setUserType] = useState("customer");
  const [user, setUser] = useState(null)
  const [bills, setBills] = useState([]);
  const [payments, setPayments] = useState([]);
  const loginHandler = async (loginCredentials) => {
    if(loginCredentials.loginType === 0){
      try {
        const userObject = await loginService.login(loginCredentials)
        console.log("User: ", userObject)
        if (userObject) {
          setUser(userObject);
          window.localStorage.setItem('sessionUser', JSON.stringify(userObject));
        }
        else {
          alert("Log in failed, check username and password entered")
        }
  
      }
      catch (exception) {
        alert("Log in failed, check username and password entered")
      }
    }
    else{
      try {
        const userObject = await loginService.officerLogin(loginCredentials)
        console.log("User: ", userObject)
        if (userObject) {
          setUser(userObject);
          window.localStorage.setItem('sessionUser', JSON.stringify(userObject));
        }
        else {
          alert("Log in failed, check username and password entered")
        }
  
      }
      catch (exception) {
        alert("Log in failed, check username and password entered")
      }

    }
    
  }
  const getBills = async () => {
    try {
      const response = await customerService.getBills({ customerId: user.customerId });
      console.log("Bills", response);
      setBills(response);
    }
    catch (exception) {
      console.log("Failed to Load Bills");
    }
  }
  const getPayments = async () => {
    try {
      const response = await customerService.getPaymentHistory({ customerId: user.customerId });
      console.log("Payments", response);
      setPayments(response);
    }
    catch (exception) {
      console.log("Failed to Load Payments");
    }
  }
  useEffect(() => {
    console.log(userType);
    const sessionUser = window.localStorage.getItem('sessionUser')
    if (sessionUser) {
      setUser(JSON.parse(sessionUser))
      if (JSON.parse(sessionUser).hasOwnProperty('officerId')) {
        setUserType("officer");
      }
    }
    else
      setUser(null)
  }, []);
  useEffect(() => {
    if (user && user.hasOwnProperty('customerId')) {
      getBills();
      getPayments();
    }
  }, [user]);
  return (
    <BrowserRouter>
      <div>
        <Header user={user} setUser={setUser} />
        {
          (user !== null) && <Navbar user={user} />
        }
        <Routes>
          {
            (!user) && <Route path="/" element={<AuthPage loginHandler={loginHandler} />} />
          }
          {
            (user && user.hasOwnProperty('customerId')) &&
            <Route path="/" element={<Dashboard user={user} />} />
          }
          {
            (user && user.hasOwnProperty('officerId')) &&
            <Route path="/" element={<OfficerDashboard user={user} />} />
          }
          <Route path="/about" element={<AboutPage />} />
          {
            (user && user.hasOwnProperty('customerId')) &&
            <Route path="/bills" element={<BillsPayments user={user} bills={bills} payments={payments} />} />
          }

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
