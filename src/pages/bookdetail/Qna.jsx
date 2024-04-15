import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/Qna.css"; // CSS 파일 임포트

export default function Qna() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const { bookId } = useParams();
  const [hasToken, setHasToken] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // 드롭다운 상태 관리

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/question/${bookId}`);
        setQuestions(response.data.map(question => ({
          ...question,
          createdAt: new Date(question.createdAt).toISOString().split('T')[0], // 날짜 형식 변경
          status: question.status === 'ANSWER_PENDING' ? '답변예정' : question.status // 상태 텍스트 변경
        })));
      } catch (error) {
        console.error("질문 목록을 불러오는데 실패했습니다.", error);
      }
    };

    if (bookId) {
      fetchQuestions();
    }

    const token = localStorage.getItem('access');
    setHasToken(!!token);
  }, [bookId]);

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access');
    if (!token) {
      console.error('접근 권한이 없습니다.');
      return;
    }

    const questionData = {
      bookId,
      content: newQuestion,
      createdBy: "사용자명",
    };

    const headers = { access: ` ${token.trim()}` };

    try {
      const response = await axios.post(
          "http://localhost:8080/api/v1/question",
          questionData,
          { headers }
      );
      setQuestions([...questions, {
        ...response.data,
        createdAt: new Date(response.data.createdAt).toISOString().split('T')[0],
        status: response.data.status === 'ANSWER_PENDING' ? '답변예정' : response.data.status
      }]);
      setNewQuestion("");
    } catch (error) {
      console.error("질문을 추가하는데 실패했습니다.", error);
    }
  };

  const deleteQuestion = async (questionId) => {
    const token = localStorage.getItem('access');
    if (!token) {
      console.error('접근 권한이 없습니다.');
      return;
    }

    const headers = { access: ` ${token.trim()}` };

    try {
      await axios.delete(`http://localhost:8080/api/v1/question/${questionId}`, { headers });
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (error) {
      console.error("질문을 삭제하는데 실패했습니다.", error.response);
    }
  };

  const toggleDropdown = (event, index) => {
    // 이벤트 버블링 방지
    event.stopPropagation();

    // 현재 활성화된 인덱스와 같으면 null을 설정하고, 그렇지 않으면 새 인덱스 설정
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
      <div className="qna-container">
        <h2 className="qna-title">QnA 상품문의</h2>
        <table className="qna-table">
          <colgroup>
            <col style={{width: "5%"}}/>
            <col style={{width: "10%"}}/>
            <col style={{width: "50%"}}/>
            <col style={{width: "15%"}}/>
            <col style={{width: "10%"}}/>
          </colgroup>
          <thead>
          <tr>
            <th>번호</th>
            <th>답변여부</th>
            <th>내용</th>
            <th>작성자</th>
            <th>등록일자</th>
          </tr>
          </thead>
          <tbody>
          {questions.map((question, index) => (
              <React.Fragment key={index}>
                <tr onClick={(e) => toggleDropdown(e, index)}>
                  <td>{index + 1}</td>
                  <td>{question.status}</td>
                  <td>{question.content}</td>
                  <td>{question.createdBy}</td>
                  <td>{question.createdAt}</td>
                </tr>
                {activeIndex === index && (
                    <tr>
                      <td colSpan="6">
                        <div className="question-details">
                          <p>{question.details}</p>
                          {hasToken && (
                              <div className="comment-actions">
                                <button className="edit-button" onClick={() => {/* 편집 로직 */}}>
                                  수정
                                </button>
                                <button className="delete-button" onClick={() => deleteQuestion(question.id)}>
                                  삭제
                                </button>
                              </div>
                          )}
                        </div>
                      </td>
                    </tr>
                )}
              </React.Fragment>
          ))}
          </tbody>
        </table>
        <form onSubmit={handleQuestionSubmit}>
            <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                required
            ></textarea>
          <button type="submit" className="submit-button">질문 제출</button>
        </form>
      </div>
  );
}
