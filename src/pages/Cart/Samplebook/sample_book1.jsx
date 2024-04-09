import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartStyle from "../../../css/Cart.module.css";

export default function Book1() {
  const navigate = useNavigate();

  const id = 1;
  const itemName = "1퍼센트 부자들의 법칙";
  const price = 10000;
  const imgPath = "/경제.png";
  const [count, setCount] = useState(1);

  let isExist = false;

  const countUp = () => {
    setCount((pre) => (pre += 1));
    console.log(count + 1);
  };

  const countDown = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount((pre) => (pre -= 1));
    }

    console.log(count - 1);
  };

  const totalprice = price * count;
  console.log(totalprice);

  const tocart = {
    id: id,
    itemName: itemName,
    price: price,
    imgPath: imgPath,
    count: count,
  };

  const Cartbutton = (e) => {
    //로컬에 토큰 가지고 있는지 확인 -> 없으면 로컬
    let nonuser_cart = localStorage.getItem("nonuser_cart");

    if (nonuser_cart == null) {
      nonuser_cart = [];
    } else {
      nonuser_cart = JSON.parse(nonuser_cart);
    }

    Object.keys(nonuser_cart).forEach(async (key) => {
      console.log(nonuser_cart[key].itemName);
      if (nonuser_cart[key].itemName === itemName) isExist = true;
    });

    //토큰 가지고 있으면

    if (isExist === false) {
      alert("상품이 담겼습니다!");
      const newnonuser_cart = [...nonuser_cart, tocart];
      localStorage.setItem("nonuser_cart", JSON.stringify(newnonuser_cart));
    } else {
      alert("상품이 이미 담겨있습니다!");
    }

    console.log(nonuser_cart);
  };

  return (
    <div>
      <div
        style={{
          width: "1200px",
          height: "1000px",
          margin: "auto",
          padding: "100px 100px 100px 200px",
          display: "flex",
        }}
      >
        <div style={{ width: "450px" }}>
          <p
            style={{
              height: "60px",
              fontSize: "38px",
              textAlign: "center",
              marginBottom: "0",
            }}
          >
            {itemName}
          </p>
          <p
            style={{
              height: "30px",
              textAlign: "center",
            }}
          >
            작가/출판사
          </p>
          <div>
            <img src={imgPath} />
          </div>
        </div>

        <div
          style={{
            width: "400px",
            height: "400px",
            margin: "110px 0 0 70px",
            paddingTop: "70px",
            paddingLeft: "50px",
          }}
        >
          <p
            style={{
              width: "250px",
              borderBottom: "1px solid gray",
              height: "60px",
              fontSize: "34px",
            }}
          >
            {price} 원
          </p>
          <div
            style={{
              display: "flex",
              width: "250px",
              height: "100px",
              alignItems: "center",
              marginTop: "50px",
              paddingLeft: "60px",
            }}
          >
            <div
              style={{ width: "40px", height: "40px" }}
              className={CartStyle.countbtn}
              onClick={countDown}
            >
              <p>-</p>
            </div>
            <div
              style={{ width: "40px", height: "40px", fontSize: "24px" }}
              className={CartStyle.count}
            >
              {count}
            </div>
            <div
              style={{ width: "40px", height: "40px" }}
              className={CartStyle.countbtn}
              onClick={countUp}
            >
              +
            </div>
          </div>

          <button
            style={{
              marginLeft: "35px",
              backgroundColor: "lightblue",
              color: "black",
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            onClick={Cartbutton}
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
