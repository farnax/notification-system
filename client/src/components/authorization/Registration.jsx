import React, { useState } from 'react';
import './authorization.css';
import Input from '../../utils/input/Input';
import { registration } from '../../actions/user';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='authorization'>
            <div className="authorization__header">Register</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
            <button className="authorization__btn" 
                onClick={async () => {
                    await registration(email, password);
                    setEmail('');
                    setPassword('');
                }}
            >Sign up</button>
        </div>
    );
};

export default Registration;