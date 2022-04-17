import axios from 'axios';
import { setOptions } from '../reducers/optionReducer';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getOptions = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${baseURL}/notifications`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setOptions(response.data.options));
        } catch (err) {
            alert(err.response?.data?.message);
        }
    }
};

export const changeOptions = (frequency, limit) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${baseURL}/notifications`, {}, {  
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, 
                params: { frequency, limit}
            });
            dispatch(setOptions(response.data.options));
            alert('Settings applied successfully');
        } catch (err) {
            alert(err.response?.data?.message);
        }
    }
};