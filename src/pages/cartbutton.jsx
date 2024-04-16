import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl";

const CartButton = ({ bookId, book, quantityRef }) => {
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("access"); //로컬에 토큰 있는지 확인

  let isExist = false; //상품이 이미 담겨있는지 확인 위함
  const handleCartClick = () => {
    const count = parseInt(quantityRef.current.value);

    if (accesstoken === null) {
      console.log(book.stock);

      if (count <= book.stock) {
        let nonuser_cart = localStorage.getItem("nonuser_cart");
        const tocart = {
          id: parseInt(bookId),
          bookId: parseInt(bookId),
          itemName: book.itemName,
          price: parseInt(book.price),
          image: book.image || "https://source.unsplash.com/featured/?book",
          count: count,
          stock: book.stock,
        };

        if (nonuser_cart == null) {
          nonuser_cart = [];
        } else {
          nonuser_cart = JSON.parse(nonuser_cart);
        }

        Object.keys(nonuser_cart).forEach(async (key) => {
          if (nonuser_cart[key].bookId === parseInt(bookId)) {
            isExist = true;
            nonuser_cart[key].count += count;
            localStorage.setItem("nonuser_cart", JSON.stringify(nonuser_cart));
          }
        });

        if (isExist === false) {
          const newnonuser_cart = [...nonuser_cart, tocart];
          localStorage.setItem("nonuser_cart", JSON.stringify(newnonuser_cart));
        }

        const iscomfirmed = window.confirm(
          "상품이 담겼습니다! 장바구니로 이동하시겠습니까?"
        );
        if (iscomfirmed) navigate("/cart");
      } else {
        alert("담으려는 수가 재고보다 많습니다! 개수를 조정해주세요!");
      }
    } else {
      const config = {
        headers: {
          access: accesstoken,
        },
      };

      (async () => {
        try {
          const response = await axios.post(
            `${baseApiUrl}/api/v1/cart`,
            {
              id: "",
              bookId: bookId,
              count: count,
            },
            config
          );
          console.log(response.data);

          const iscomfirmed = window.confirm(
            "상품이 담겼습니다! 장바구니로 이동하시겠습니까?"
          );
          if (iscomfirmed) navigate("/cart");
        } catch (e) {
          console.error(e.response.data.message);
          const stock = e.response.data.stock;

          if (e.response.data.message === "재고가 부족합니다.") {
            alert("담으려는 수가 재고보다 많습니다! 개수를 조정해주세요!");
          }
        }
      })();
    }
  };
  return (
    <button type="button" className="add-to-cart" onClick={handleCartClick}>
      장바구니 담기
    </button>
  );
};

export default CartButton;
