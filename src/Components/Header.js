import React, { useEffect } from 'react'
import './Stylesheets/Header.css'
import logo from '../Images/payImage.jpeg'
import { useNavigate } from 'react-router-dom';
import {FaRegUser} from 'react-icons/fa'
const Header = ({ user, setUser }) => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('sessionUser')
        navigate('/');
        setUser(null);
    }
    useEffect(() => {
        const sessionUser = window.localStorage.getItem('sessionUser')
        if (sessionUser)
            setUser(JSON.parse(sessionUser))
        else {
            setUser(null)
            navigate('/');
        }

    }, []);
    return (
        <div className='headerPage shadow-sm p-3 bg-body rounded'>
            {
                (user !== null) &&
                <>
                    <button className='headerTextRight btn btn-outline-primary' onClick={logout}>
                        Logout
                    </button>
                    {
                        (user.hasOwnProperty('customerId')) ?
                        <b className='headerTextRight text-success mx-1'><FaRegUser /> &ensp;User : {user.customerId} - {user.firstName} {user.lastName}</b> :
                        <b className='headerTextRight text-success mx-1'><FaRegUser /> &ensp;Officer : {user.officerId} - {user.officerName}</b>
                    }
                    
                </>
            }

            <div className='headerTitle'><span><img src={logo} alt="logo" width={45} height={30} /></span> Electricity Bill - Utility Payment System </div>
        </div>
    )
}

export default Header