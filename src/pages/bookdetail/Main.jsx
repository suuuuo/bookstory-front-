import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams 훅 import
import "../../css/BookMain.css";
import Cartbutton from "../cartbutton";

export default function Main() {
  const [book, setBook] = useState({
    itemName: "",
    author: "",
    price: "",
    publisher: "",
    description: "",
    image: "",
  });

  const { bookId } = useParams(); // URL에서 bookId 파라미터 값을 가져옴

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // 동적으로 bookId를 URL에 삽입하여 API 요청
        const response = await axios.get(
          `http://localhost:8080/api/v1/books/${bookId}`,
        );
        setBook(response.data);
      } catch (error) {
        console.error("책 정보를 가져오는데 실패했습니다.", error);
      }
    };

    fetchBookDetails();
  }, [bookId]); // bookId가 변경될 때마다 useEffect 내의 로직을 다시 실행

  const quantityRef = useRef(); // 장바구니 버튼; 개수 가져오기 위함

  return (
    <div className="container">
      <div className="book-details">
        <div className="book-info">
          <p className="itemName">{book.itemName}</p>
          <p className="author">글쓴이: {book.author}</p>
          <p className="publisher">출판사: {book.publisher}</p>
          <img
            src={book.image || "https://source.unsplash.com/featured/?book"}
            alt="책 사진"
            className="book-image"
          />
        </div>
        <div className="purchase-info">
          <p className="price">책 가격: {book.price}원</p>
          <div className="divider"></div>
          <p>적립/혜택 XX P</p>
          <div className="divider"></div>
          <div className="quantity-container">
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              defaultValue="1"
              className="number"
              ref={quantityRef}
            />
          </div>

          <div className="buttons-container">
            <Cartbutton
              className="add-to-cart"
              bookId={bookId}
              book={book}
              quantityRef={quantityRef}
            />
            <button class="secondary" type="button" className="buy-now">
              책구매
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
