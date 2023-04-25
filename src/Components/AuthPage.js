import React, { useState } from "react";
import './Stylesheets/AuthPage.css';
import loginService from '../Services/LoginService';
function AuthPage({ loginHandler }) {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerUserName, setRegisterUserName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [loginType, setLoginType] = useState(0);
    const [error, setError] = useState(null);
    const [loginPage, setLoginPage] = useState(true);
    function handleLoginSubmit(e) {
        e.preventDefault();
        if (loginUsername === "" || loginPassword === "") {
            setError("Please enter a username and password");
        } else {
            const loginCredentials = {
                loginType: loginType, userName: loginUsername, password: loginPassword
            }
            console.log("loginCredentials",loginCredentials);
            loginHandler(loginCredentials)
        }
    }
    const handleRegister = async (reqBody) => {
        try {
          const response = await loginService.register(reqBody)
          if (response) {
            alert("Registration Successful! You Can Login Now. Your Cust. ID: "+response);
          }
          else{
            alert("Operation Failed!, Unable to Signup Try Later");
          }
          
        }
        catch (exception) {
            alert("Operation Failed!, Invalid Details, Try Again");
        }
      }
    function handleRegisterSubmit(e) {
        e.preventDefault();
        if (registerPassword !== registerConfirmPassword) {
            setError("Passwords do not match");
        } else {
            // Submit registration form data
            const reqBody = {
                "firstName": registerFirstName,
                "lastName": registerLastName,
                "address": address,
                "email": email,
                "mobileNumber": registerPhoneNumber,
                "userName": registerUserName,
                "password": registerPassword
            }
            handleRegister(reqBody);
            setAddress('');
            setEmail('');
            setRegisterPassword('');
            setRegisterConfirmPassword('');
            setRegisterPhoneNumber('');
            setRegisterFirstName('');
            setRegisterLastName('');
            setRegisterUserName('');
            // window.location.reload(true);
        }
    }

    return (
        <div className="container">
            {
                (loginPage) ?

                    <div className="form">
                        <h2>Login</h2>
                        {error && <div className="error">{error}</div>}
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={loginType} onChange={(e)=> setLoginType(1)} />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Officer Login
                                    </label>
                            </div>
                            <div className="form-check mb-5">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={loginType} onChange={(e)=> setLoginType(0)} checked />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        User Login
                                    </label>
                            </div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <button type="submit" disabled={loginUsername === "" || loginPassword === ""}>
                                Login
                            </button>
                            <button type="button" onClick={() => setLoginPage(false)}>Register</button>
                        </form>
                    </div>
                    :
                    <div className="form">
                        <h2>Register</h2>
                        {error && <div className="error">{error}</div>}
                        <form onSubmit={handleRegisterSubmit}>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={registerFirstName}
                                onChange={(e) => setRegisterFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={registerLastName}
                                onChange={(e) => setRegisterLastName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                value={registerPhoneNumber}
                                onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                className="form-group"
                                style={{width:"100%", marginBottom:"10px", padding:"8px"}}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={registerUserName}
                                onChange={(e) => setRegisterUserName(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={registerConfirmPassword}
                                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="submit">
                                Register
                            </button>
                            <button type="button" onClick={() => setLoginPage(true)}>Login Now</button>
                        </form>
                    </div>
            }
        </div>
    );
}

export default AuthPage;
