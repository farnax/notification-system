import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../reducers/userReducer.js';
import './navbar.css';

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__header">Notification system</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Sign in</NavLink></div> }
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Sign up</NavLink></div> }
                {isAuth && <div className="navbar__login" ><NavLink to="/disk">Disk</NavLink></div> }
                {isAuth && <div className="navbar__login" ><NavLink to="/option">Notification options</NavLink></div> }
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout()) }>Exit</div> }
            </div>
        </div>
    );
};

export default Navbar;