import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams 훅 import
import "../../css/BookMain.css";

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

  // 이하는 장바구니 담기 버튼 로직입니다!
  let isExist = false; //상품이 이미 담겨있는지 확인 위함
  const quantityRef = useRef(); // 개수 가져오기 위함

  const Cartbutton = (e) => {
    const accesstoken = localStorage.getItem("access"); //로컬에 토큰 있는지 확인
    const count = parseInt(quantityRef.current.value);
    if (accesstoken === null) {
      let nonuser_cart = localStorage.getItem("nonuser_cart");

      const tocart = {
        id: parseInt(bookId),
        itemName: book.itemName,
        price: parseInt(book.price),
        img: book.image,
        count: count,
      };

      if (nonuser_cart == null) {
        nonuser_cart = [];
      } else {
        nonuser_cart = JSON.parse(nonuser_cart);
      }
      alert("상품이 담겼습니다!");

      Object.keys(nonuser_cart).forEach(async (key) => {
        if (nonuser_cart[key].id === parseInt(bookId)) {
          isExist = true;
          nonuser_cart[key].count += count;
          localStorage.setItem("nonuser_cart", JSON.stringify(nonuser_cart));
        }
      });

      if (isExist === false) {
        const newnonuser_cart = [...nonuser_cart, tocart];
        localStorage.setItem("nonuser_cart", JSON.stringify(newnonuser_cart));
      }
    } else {
      alert("상품이 담겼습니다!");
      const config = {
        headers: {
          access: accesstoken,
        },
      };
      (async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/cart",
            {
              id: "",
              bookId: bookId,
              count: count,
            },
            config,
          );
          console.log(response.data);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  };

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
              className="quantity-input"
              ref={quantityRef}
            />
          </div>

          <div className="buttons-container">
            <button type="button" className="add-to-cart" onClick={Cartbutton}>
              장바구니 담기
            </button>
            <button type="button" className="buy-now">
              책구매
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
