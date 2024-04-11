import React, { useRef } from "react";
import { useState, useEffect } from "react";
import CartStyle from "../../css/Cart.module.css";
import axios from "axios";
import Cart from "./cart";
import { useNavigate } from "react-router-dom";

{
  /*체크박스 상태관리*/
}
export default function CartBook({ cartbook, isChecked, onChange }) {
  const navigate = useNavigate();
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked; //isChecked
    onChange(checked); // 상태 변경?

    const checkbox = {
      id: cartbook.id,
    };

    console.log(checkbox);

    let checkedcartbook = localStorage.getItem("checkedcartbook");

    if (checkedcartbook == null) {
      checkedcartbook = [];
    } else {
      checkedcartbook = JSON.parse(checkedcartbook);
    }

    if (checked && checkedcartbook.valueOf(cartbook.id)) {
      //선택된 경우
      const newcheckedcartbook = [...checkedcartbook, checkbox];
      localStorage.setItem(
        "checkedcartbook",
        JSON.stringify(newcheckedcartbook),
      );
    } else {
      //해제된 경우
      const newcheckedcartbook = checkedcartbook.filter(
        (item) => item.id !== checkbox.id,
      );
      localStorage.setItem(
        "checkedcartbook",
        JSON.stringify(newcheckedcartbook),
      );
    }
  };

  {
    /*카운트 숫자 변경 시*/
  }

  const [count, setCount] = useState(cartbook.count);
  let countVar = cartbook.count;

  const accesstoken = localStorage.getItem("access");

  const countUp = (e) => {
    setCount((pre) => (pre += 1));

    if (accesstoken === null) {
      //비회원
      console.log("토큰 없음, 비회원!");

      let updatecart = JSON.parse(localStorage.getItem("nonuser_cart"));

      Object.keys(updatecart).forEach(async (key) => {
        if (cartbook.id === updatecart[key].id) {
          updatecart[key].count = count + 1;
        }
      });

      localStorage.setItem("nonuser_cart", JSON.stringify(updatecart));
    } else {
      //회원 - 확인 필요
      console.log("토큰 있음, 회원!");

      const config = {
        headers: {
          Authorization: accesstoken, //토큰
        },
      };

      (async () => {
        try {
          const response = await axios.put(
            "http://localhost:8080/api/v1/cart",
            {
              ...config,
              data: {
                id: cartbook.id,
                count: count + 1,
              },
            },
          );
          console.log(response.data);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  };

  const countDown = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount((pre) => (pre -= 1));
    }
    if (accesstoken === null) {
      //비회원
      console.log("토큰 없음, 비회원!");

      let updatecart = JSON.parse(localStorage.getItem("nonuser_cart"));

      Object.keys(updatecart).forEach(async (key) => {
        if (cartbook.id === updatecart[key].id) {
          updatecart[key].count = count - 1;
        }
      });
      localStorage.setItem("nonuser_cart", JSON.stringify(updatecart));
    } else {
      //회원 - 확인 필요
      console.log("토큰 있음, 회원!");
      (async () => {
        try {
          const response = await axios.put(
            "http://localhost:8080/api/v1/cart",
            {
              ...config,
              data: {
                id: cartbook.id,
                count: count - 1,
              },
            },
          );
          console.log(response.data);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  };

  {
    /*한 권 당 총 금액*/
  }
  const totalprice = cartbook.price * count;

  return (
    <div className={CartStyle.whole_card}>
      <div //이미지, 제목, 한 권당 가격
        style={{
          width: "430px",
          height: "230px",
          display: "flex",
        }}
      >
        <input
          className="checkbox"
          style={{
            borderRadius: "50%",
            cursor: "pointer",
            margin: "15px 0 0 20px",
          }}
          type="checkbox"
          //checked={.isChecked}
          //onChange={(e) => onChange(e)}
          checked={cartbook.isChecked}
          onChange={handleCheckboxChange}
        ></input>

        <div
          className={CartStyle.book_image} //이미지
        >
          <img
            src={cartbook.imgPath}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div //제목, 가격
          style={{
            width: "200px",
            height: "45px",
            fontSize: "14px",
            margin: "55px 0 0 10px",
            textAlign: "center",
          }}
        >
          [{cartbook.itemName}]<div>[{cartbook.price}]</div>
        </div>
      </div>

      <div //한 권 당 총 가격, 버튼
        style={{
          width: "300px",
          height: "230px",
          borderLeft: "1px solid black",
        }}
      >
        <div
          className={CartStyle.totalprice} //총 가격
        >
          {totalprice}
        </div>

        <div
          style={{
            paddingTop: "20px",
            paddingLeft: "106px",
            display: "flex",
          }}
        >
          <div className={CartStyle.countbtn} onClick={countDown}>
            <p>-</p>
          </div>
          <div className={CartStyle.count}>{count}</div>
          <div className={CartStyle.countbtn} onClick={countUp}>
            +
          </div>
        </div>
      </div>
    </div>
  );
}
