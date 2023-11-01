import React, { useCallback } from 'react';
import FileUpload from '../components/file-upload';

function Document(): React.ReactElement {
    const onFileUpload = useCallback((file: File) => {
        if (file.name.endsWith('pdf')) {
            
        }
    }, []);
    return (
        <FileUpload onUpload={onFileUpload} />
    );
}

export default Document;
