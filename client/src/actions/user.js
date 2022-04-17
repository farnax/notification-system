import axios from 'axios';
import { setUser } from '../reducers/userReducer';

const baseURL = process.env.REACT_APP_BASE_URL;

export const registration = async(email, password) => {
    try {
        const response = await axios.post(`${baseURL}/auth/registration`, {
            email,
            password
        });
        
        alert(response.data.message);
    } catch (err) {
        alert(err.response?.data?.message);
    }
};


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${baseURL}/auth/login`, {
                email,
                password
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            alert(err.response?.data?.message);
        }
    }
};

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${baseURL}/auth/auth`,
                { headers: { Authorization:`Bearer ${localStorage.getItem('token') }` }} 
            );

            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            localStorage.removeItem('token');
        }
    }
}