import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/getAllMyOrders.css";

export default function OrderList() {
  // 상태 초기화
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // 토큰 가져오기
    const token = localStorage.getItem("access");

    const fetchOrders = async () => {
      try {
        // 주문 목록 조회
        const response = await axios.get(`/api/v1/orders`, {
          headers: {
            access: token,
          },
          withCredentials: true,
        });

        setOrders(response.data.content);
      } catch (error) {
        setError("주문 정보를 불러오는 중에 오류가 발생했습니다.");
      }
    };

    fetchOrders();
  }, []);

  // 주문 목록을 출력하는 함수
  const renderOrders = () => {
    return orders.map((order) => (
      <div key={order.id}>
        <p>주문 번호: {order.id}</p>
        <p>주문 상태: {order.orderStatus}</p>
        {/* 주문 정보의 나머지 필드들을 출력 */}
      </div>
    ));
  };

  // 화면 보이게 하기
  return (
    <div className="container">
      <div className="item"></div>

      <div className="itemOrder">
        <h1>주문 내역</h1>
      </div>
    </div>
  );
}
