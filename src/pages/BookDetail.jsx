import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseApiUrl } from "../constants/apiUrl.js";

import "../css/BookDetail.css"; // CSS 파일 임포트

export default function BookDetail() {
  const [book, setBook] = useState({
    itemName: "",
    author: "",
    price: "",
    publisher: "",
    description: "",
    image: "",
  });

  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/api/v1/books/${bookId}`,
        );
        setBook(response.data);
      } catch (error) {
        console.error("책 정보를 가져오는데 실패했습니다.", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <div className="bookDetailContainer">
      <p className="bookDetailTitle">책 소개</p>
      <div className="divider"></div>
      <p className="bookDetailDescription">{book.description}</p>
    </div>
  );
}
