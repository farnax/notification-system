import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import { getOptions } from '../../actions/option';
import FileList from './fileList/FileList';
import './disk.css';

const Disk = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFiles());
        dispatch(getOptions());
    }, [dispatch]);

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file)));
    }

    return (
        <div className="disk">
            <div className="disk__btns">
                <div className="disk_upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">
                        Upload File
                    </label>
                    <input 
                        multiple={true}
                        onChange={(event) => fileUploadHandler(event)}
                        id="disk__upload-input" type="file" className="disk__upload-input" />
                </div>
            </div>

            <FileList/>
        </div>
    );
};

export default Disk;