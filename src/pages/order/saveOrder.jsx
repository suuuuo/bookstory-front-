import React, { useState } from "react";
import axios from "axios";

export default function saveOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const orderFromCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const accesstoken = localStorage.getItem("access"); // 토큰 가져오기
      const totalPrice = localStorage.getItem("totalPrice"); // 결제 가격 가져오기

      console.log("saveOrdertoken : " + accesstoken);
      console.log("totalPrice : " + totalPrice);

      // API에 전송할 주문 데이터 생성
      const requestOrder = {
          cartId: "",
          orderStatus: "NEW",
          totalPrice: totalPrice
      };

      // 주문 API 호출
      const response = await axios.post("/v1/orders/order", requestOrder, {
        headers: {
          Authorization: accesstoken, // 액세스 토큰을 헤더에 포함
        },
      });

      // 주문 성공 시
      setLoading(false);
      console.log("주문 저장 성공:", response.data);
    } catch (error) {
      // 주문 실패 시
      setLoading(false);
      setError("주문을 처리하는 도중 오류가 발생했습니다.");
      console.error("주문 실패:", error);
    }
  };

  return (
    <div>
      <h2>배송 정보 입력</h2>
      {loading && <p>주문을 처리하는 중입니다...</p>}
      {error && <p>{error}</p>}
      <button onClick={orderFromCart}>장바구니에서 주문하기</button>
      하나둘셋
    </div>
  );
}
