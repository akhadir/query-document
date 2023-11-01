import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PromptAnswer from './workspaces/prompt-answer';
import DocumentUpload from './workspaces/document-upload';

function AppRoutes(): React.ReactElement | null {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<DocumentUpload />} />
                <Route path="/qna" element={<PromptAnswer />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
