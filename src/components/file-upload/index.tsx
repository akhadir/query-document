import React, { useCallback, useState } from 'react';
import { FilePicker } from 'react-file-picker';
import { Alert } from '@mui/material';
import { onUpload } from '../../services/pdf';
import './index.css';

export type FileUploadProps = {
    onUpload: (file: File) => void;
};

export const FileUpload = (props: FileUploadProps) => {
    const [errorMsg, setErrorMsg] = useState<string>();
    const onFileUpload = useCallback((fileObject: File) => {
        onUpload(fileObject, props.onUpload);
    }, [props.onUpload]);
    const onError = useCallback((errMsg: React.SetStateAction<string | undefined>) => {
        setErrorMsg(errMsg);
    }, []);
    return (
        <>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <p>Upload a document file (image or PDF) to process.</p>
            <div className="file-upload-wrapper">
                <FilePicker
                    extensions={['txt', 'png', 'jpg', 'pdf', 'jpeg']}
                    onChange={onFileUpload}
                    onError={onError}
                >
                    <button type="button">Upload</button>
                </FilePicker>
            </div>
        </>
    );
};

export default FileUpload;
