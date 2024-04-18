import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../css/getAllMyOrders.css";
import { baseApiUrl } from "../../constants/apiUrl";


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
        const response = await axios.get(`${baseApiUrl}/api/v1/orders`, {
          headers: {
            access: token,
          },
          params: {
            page: 0,
            size: 15,
          },
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
        <p>주문 날짜: {order.orderDate}</p>
      </div>
    ));
  };

  // 화면 보이게 하기
  return (
    <div className="container">
      <div className="item"></div>

      <div className="itemOrder">
        <h1>주문 내역</h1>
        {error && <p>{error}</p>}
        {orders.length > 0 ? renderOrders() : <p>주문 내역이 없습니다.</p>}
      </div>
    </div>
  );
}
