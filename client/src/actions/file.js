import axios from 'axios';
import { addFile, setFiles, deleteFile } from '../reducers/fileReducer';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getFiles = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${baseURL}/files/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(setFiles(response.data));
        } catch (err) {
            alert(err.response?.data?.message);
        }
    }
};

export const uploadFile = file => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${baseURL}/files`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e.response?.data?.message);
        }
    }
};

export const downloadFile = async file => {
    try {
        const response = await fetch(`${baseURL}/files/${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
    
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', downloadUrl);
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    } catch (err) {
        alert(err);
    }
};

export const removeFile = file => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${baseURL}/files/${file._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.status === 200) {
                dispatch(deleteFile(file._id));
            }
        } catch (err) {
            alert(err.response?.data?.message);
        }
    }
};
