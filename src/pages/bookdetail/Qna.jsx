import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Qna() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const { bookId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/question/${bookId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("질문 목록을 불러오는데 실패했습니다.", error);
      }
    };

    if (bookId) {
      fetchQuestions();
    }
  }, [bookId]);

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access'); // 'access' 키에서 토큰 값 불러오기
    if (!token) {
      console.error('접근 권한이 없습니다.');
      return; // 토큰이 없으면 함수 실행 중지
    }

    const questionData = {
      bookId,
      content: newQuestion,
      createdBy: "사용자명",
    };

    try {
      const response = await axios.post(
          "http://localhost:8080/api/v1/question",
          questionData,
          { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestions([...questions, response.data]); // 새로운 질문을 목록에 추가
      setNewQuestion("");
    } catch (error) {
      console.error("질문을 추가하는데 실패했습니다.", error);
    }
  };

  return (
      <div>
        <h2>QnA</h2>
        <ul>
          {questions.map((question, index) => (
              <li key={index}>
                {question.content}
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
