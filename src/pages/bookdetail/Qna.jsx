import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/Qna.css"; // CSS 파일 임포트

export default function Qna() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false); // 질문 드롭
  const { bookId } = useParams();
  const [hasToken, setHasToken] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // 드롭다운 상태 관리
  const [editIndex, setEditIndex] = useState(-1); // 편집 중인 질문의 인덱스
  const [editContent, setEditContent] = useState(""); // 편집 중인 내용

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/question/${bookId}`,
        );
        setQuestions(
          response.data.map((question) => ({
            ...question,
            createdAt: new Date(question.createdAt).toISOString().split("T")[0], // 날짜 형식 변경
            status:
              question.status === "ANSWER_PENDING"
                ? "답변예정"
                : question.status, // 상태 텍스트 변경
          })),
        );
      } catch (error) {
        console.error("질문 목록을 불러오는데 실패했습니다.", error);
      }
    };

    if (bookId) {
      fetchQuestions();
    }

    const token = localStorage.getItem("access");
    setHasToken(!!token);
  }, [bookId]);

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("접근 권한이 없습니다.");
      return;
    }

    const questionData = {
      bookId,
      title,
      content: newQuestion,
      createdBy: "사용자명",
    };
    console.log(questionData);
    const headers = { access: ` ${token.trim()}` };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/question",
        questionData,
        { headers },
      );
      setQuestions([
        ...questions,
        {
          ...response.data,
          createdAt: new Date(response.data.createdAt)
            .toISOString()
            .split("T")[0],
          status:
            response.data.status === "ANSWER_PENDING"
              ? "답변예정"
              : response.data.status,
        },
      ]);
      setNewQuestion("");
      setTitle("");
      setShowForm(false);
    } catch (error) {
      console.error("질문을 추가하는데 실패했습니다.", error);
    }
  };

  const deleteQuestion = async (questionId) => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("접근 권한이 없습니다.");
      return;
    }

    const headers = { access: ` ${token.trim()}` };

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/question/${questionId}`,
        { headers },
      );
      setQuestions(questions.filter((q) => q.id !== questionId));
    } catch (error) {
      alert("접근 권한이 없습니다.");
      console.error("질문을 삭제하는데 실패했습니다.", error.response);
    }
  };

  const toggleDropdown = (event, index) => {
    // 이벤트 버블링 방지
    event.stopPropagation();

    setActiveIndex(index === activeIndex ? null : index);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditContent(questions[index].content);
  };

  const handleContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleSave = async (index) => {
    const questionId = questions[index].id;
    const token = localStorage.getItem("access");
    const headers = { access: `${token.trim()}` };

    try {
      await axios.put(
        `http://localhost:8080/api/v1/question/${questionId}`,
        { content: editContent },
        { headers },
      );
      const updatedQuestions = [...questions];
      console.log(updatedQuestions);
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        content: editContent,
      };
      setQuestions(updatedQuestions);
      setEditIndex(-1); // 편집 모드 종료
    } catch (error) {
      alert("접근 권한이 없습니다.");
      console.error(
        "질문을 수정하는데 실패했습니다.",
        error.response.data.message,
      );
    }
  };

  return (
    <div className="qna-container">
      <h2 className="qna-title">QnA 상품문의</h2>
      <table className="qna-table">
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>답변여부</th>
            <th>제목</th>
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
                <td>{question.title}</td>
                <td>{question.createdBy}</td>
                <td>{question.createdAt}</td>
              </tr>
              {activeIndex === index && (
                <tr>
                  <td colSpan="6">
                    <div className="question-details">
                      {editIndex === index ? (
                        <>
                          <textarea
                            value={editContent}
                            onChange={handleContentChange}
                            className="edit-textarea"
                          ></textarea>
                          <div className="comment-actions">
                            <button
                              className="save-button"
                              onClick={() => handleSave(index)}
                            >
                              저장
                            </button>
                            <button
                              className="cancel-button"
                              onClick={() => setEditIndex(-1)}
                            >
                              취소
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>{question.content}</p>
                          {hasToken && (
                            <div className="comment-actions">
                              <button
                                className="edit-button"
                                onClick={() => handleEditClick(index)}
                              >
                                수정
                              </button>
                              <button
                                className="delete-button"
                                onClick={() => deleteQuestion(question.id)}
                              >
                                삭제
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button onClick={toggleForm} className="submit-button">
        작성하기
      </button>

      {showForm && (
        <form id="question-form" onSubmit={handleQuestionSubmit}>
          <input
            type="text"
            id="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxlength="15"
            placeholder="제목을 입력하세요(15글자)"
          />
          <textarea
            id="question-textarea"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            required
          ></textarea>
          <button type="submit" id="submit-button">
            질문 제출
          </button>
        </form>
      )}
    </div>
  );
}
