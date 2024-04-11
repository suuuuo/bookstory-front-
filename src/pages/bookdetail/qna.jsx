import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function QnA() {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const {bookId} = useParams(); // URL에서 bookId 파라미터 값을 가져옴

    useEffect(() => {
        // 질문 목록을 불러오는 함수
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/question/${bookId}`);
                console.log(response);
                setQuestions(response.data); // 서버로부터 받은 데이터로 상태 업데이트
            } catch (error) {
                console.error('질문 목록을 불러오는데 실패했습니다.', error);
            }
        };

        if (bookId) {
            fetchQuestions();
        }
    }, [bookId]); // bookId가 변경될 때마다 질문 목록을 다시 불러옵니다.

    const handleQuestionSubmit = async (event) => {
        event.preventDefault();
        const questionData = {
            bookId,
            content: newQuestion,
            createdBy: '사용자명',
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/question', questionData);
            setQuestions([...questions, response.data]); // 새로운 질문을 목록에 추가
            setNewQuestion('');
        } catch (error) {
            console.error('질문을 추가하는데 실패했습니다.', error);
        }
    };

    const deleteQuestion = async (questionId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/question/${questionId}`);
            setQuestions(questions.filter(question => question.id !== questionId));
        } catch (error) {
            console.error('질문을 삭제하는데 실패.', error);
        }
    };


    return (
        <div>
            <h2>QnA</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question.content}
                        <button onClick={() => deleteQuestion(question.id)}>삭제</button>
                    </li>

                ))}
            </ul>
            <form onSubmit={handleQuestionSubmit}>
                <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                ></textarea>
                <button type="submit">질문 제출</button>
            </form>
        </div>
    );
}
