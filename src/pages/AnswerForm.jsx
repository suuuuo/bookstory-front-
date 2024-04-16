import React, { useState } from "react";
import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl.js";


function AnswerForm({ questions, activeIndex }) {
  const [answerContent, setAnswerContent] = useState("");
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("access");
    const headers = { access: ` ${token.trim()}` };


    try {
      const response = await axios.post(
        `${baseApiUrl}/api/v1/answer`,
        {
          questionId: questions[activeIndex].id,
          content: answerContent,
        },
        { headers },
      );
      console.log("답변 저장 성공:", response.data);
      setAnswerContent("");
      setShowAnswerForm(false); // 답변 제출 후 폼 숨기기

      window.location.reload();

    } catch (error) {
      console.error("답변 저장 실패:", error);
    }
  };

  const toggleAnswerForm = () => {
    setShowAnswerForm(!showAnswerForm); // 현재 상태의 반대값을 설정
  };

  return (
    <>
      <style>
        {`
            #answer-button{
              margin-right: 10px;
              max-height: 35px;
              padding: 5px 10px;
              font-size: 14px; 
              min-width: 100px;
              background-color: #4c85ae;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            #answer-form{
              margin-top: 50px;
              width: 300px;
            }
           
          `}
      </style>
      <div>
        <button id="answer-button" onClick={toggleAnswerForm}>
          답변하기
        </button>
        {showAnswerForm && (
          <form id="answer-form" onSubmit={handleAnswerSubmit}>
            <textarea
              id="answerContent"
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              required
            />
            <button type="submit">답변 제출</button>
          </form>
        )}
      </div>
    </>
  );
}

export default AnswerForm;
