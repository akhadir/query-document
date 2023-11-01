import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/file-upload';

function DocumentUpload(): React.ReactElement {
    const navigate = useNavigate();
    const handleUpload = useCallback((document: any) => {
        // console.log('Files: ', document);
        navigate('/qna');
    }, [navigate]);

    return (
        <div><FileUpload onUpload={handleUpload} /></div>
    );
}

export default DocumentUpload;
