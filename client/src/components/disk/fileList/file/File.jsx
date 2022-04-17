import React from 'react';
import { useDispatch } from 'react-redux';
import { downloadFile } from '../../../../actions/file';
import { removeFile } from '../../../../actions/file';
import fileLogo from '../../../../assets/file.svg';
import sizeFormat from '../../../../utils/sizeFormat';
import './file.css';

const File = ({ file }) => {
    const dispatch = useDispatch();

    const downloadClickHandler = event => {
       event.stopPropagation();
       downloadFile(file);
    };

    const deleteClickHandler = event => {
        event.stopPropagation();
        dispatch(removeFile(file));
        window.location.reload();
    };

    return (
        <div className='file'>
            <img src={fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            <button className="file_btn file__download"
                onClick={(event) => downloadClickHandler(event)}>Download</button>
            <button className="file_btn file__delete"
                onClick={(event) => deleteClickHandler(event)}>Delete</button>
        </div>
    );
};

export default File;