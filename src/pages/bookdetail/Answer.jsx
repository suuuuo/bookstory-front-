import React, { useEffect, useState } from "react";
import axios from "axios";

function Answer({ questionId }) {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/answer/${questionId}`,
        );
        console.log("답변을 불러왔습니다.", response);
        setAnswer(response.data);
        setLoading(false);
      } catch (error) {
        console.error("답변을 불러오는데 실패했습니다.", error);
        setAnswer(null);
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [questionId]);

  if (loading) {
    return null;
  }

  if (!answer) {
    return null;
  }

  // 날짜 형식을 YYYY-MM-DD로 변환
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // 날짜 부분만 반환
  };

  return (
    <>
      <style>
        {`
          .answer-container {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            margin-bottom: 40px;
            position: relative; 
          }

          .answer {
            font-size: 14px;
            margin-top: 20px;
            margin-left: 250px;
            margin-right: 30px;
          }

          #answer-content {
            min-width: 445px;
            margin: 0;
            text-align: left;
          }

          .details {
            display: flex;
            flex-direction: row;
            color: #666;
            font-size: 12px;
            margin-top: 10px;
          }

          #answer-create {
            position: absolute; 
            bottom: 40px;
            right: -6px; 
          }
          
          #answer-create .createdBy{
            padding-right: 72px;
          }
          
      
        `}
      </style>

      <div className="answer-container">
        <h1 className="answer">답변</h1>

        <div className="details">
          <p id="answer-content">{answer.content}</p>
        </div>
        <div id="answer-create">
          <table>
            <tr>
              <td className="createdBy">{answer.createdBy}</td>
              <td>{formatDate(answer.createdAt)}</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Answer;
