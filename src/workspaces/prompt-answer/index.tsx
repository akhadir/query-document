import React, { useCallback, useState } from 'react';
import './chat.css';
import { UPLOADED_DOCUMENTS } from '../../services/pdf';
import { getImageQuery } from '../../services/hugging-face';

function ChatWindow(): React.ReactElement {
    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const handleQuestionChange = useCallback((event: any) => {
        setQuestion(event.target.value);
    }, []);
    const handleFormSubmit = useCallback((event: any) => {
        event.preventDefault();
        if (UPLOADED_DOCUMENTS[0]) {
            setQuestions((qns) => [...qns, question]);
            getImageQuery(question, UPLOADED_DOCUMENTS[0]).then((resp: any) => {
                setAnswers((ans) => [...ans, resp.answer]);
            });
        }
    }, [question]);

    return (
        <div className="chat-window">
            {questions.map((qn, index) => (
                <div key={qn} className="question-answer">
                    <p className="question">{qn}</p>
                    <p className="answer">{answers[index] || ''}</p>
                </div>
            ))}
            <form onSubmit={handleFormSubmit}>
                <div className="input-prompt">
                    <input
                        type="text"
                        placeholder="Ask the Document Reader a question..."
                        onChange={handleQuestionChange}
                    />
                </div>
            </form>
        </div>
    );
}

export default ChatWindow;
