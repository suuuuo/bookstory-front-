import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // 토큰 가져오기
    const token = localStorage.getItem("access");
    console.log(token);

    //
    axios
      .get("/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 0,
          size: 15,
        },
      })
      .then((response) => {
        setOrders(response.data.content);
      })
      .catch((error) => {
        setError("주문 정보를 불러오는 중에 오류가 발생했습니다.");
      });
  }, []);
  // 화면 보이게 하기
  return (
    <div>
      <p>주문목록화면</p>
    </div>
  );
}
