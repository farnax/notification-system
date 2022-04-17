import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar/Navbar';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import { auth } from '../actions/user';
import Disk from './disk/Disk';
import Option from './option/Option';

import './app.css';

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <div className="wrap">
          {!isAuth ?
            <Routes>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Login />}/>
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
            :
            <Routes>
              <Route exact path="/" element={<Disk />}/>
              <Route exact path="/option" element={<Option />}/>
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          }
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
