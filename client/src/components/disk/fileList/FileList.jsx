import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File';
import './fileList.css';

const FileList = () => {

    const files = useSelector(state => state.files.files).map(file => (<File key={file._id} file={file}/>))

    return (
        files.length > 0 &&
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__size">Size</div>
            </div>
            {files}
            <p>*Hover over the file for more options</p>
        </div>
    );
};

export default FileList;