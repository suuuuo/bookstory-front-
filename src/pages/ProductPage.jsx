import React, { useState } from "react";
import BookDetail from "./BookDetail.jsx";
import Qna from "./Qna.jsx";
import "../css/ProductPage.css"; // CSS 파일 임포트

export default function ProductPage() {
  const [activeSection, setActiveSection] = useState("bookDetail");

  return (
    <div className="productPage-container">
      <div className="textContainer">
        <span
          className="clickableText"
          onClick={() => setActiveSection("bookDetail")}
        >
          상품 정보
        </span>
        <span className="clickableText" onClick={() => setActiveSection("qna")}>
          Q&A
        </span>
      </div>
      <div className="divider"></div>
      {activeSection === "bookDetail" && <BookDetail />}
      {activeSection === "qna" && <Qna />}
    </div>
  );
}
