import React, { useRef } from "react";
import { useState, useEffect } from "react";
import CartStyle from "../../css/Cart.module.css";
import axios from "axios";
import CartBook from "./CartBook";

{
  /*기본 화면 구성 : module.css 사용*/
}
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
/>;

export default function Cart() {
  const accesstoken = localStorage.getItem("access"); // 로컬 스토리지에서 토큰 가져옴

  const [cartbooks, setcartbooks] = useState([]);
  if (accesstoken === null) {
    useEffect(() => {
      let nonuser_cart = JSON.parse(localStorage.getItem("nonuser_cart"));
      console.log("토큰 없음 - 비회원!");

      setcartbooks(
        nonuser_cart.map((cartbook) => ({ ...cartbook, isChecked: true }))
      );
      const defaultCartbooks = cartbooks.map((cartbook) => ({
        id: cartbook.id,
      }));
      console.log(defaultCartbooks);
      localStorage.setItem("checkedcartbook", JSON.stringify(defaultCartbooks));
    }, []);
  } else {
    const config = {
      headers: {
        Authorization: accesstoken,
      },
    };

    useEffect(() => {
      let nonuser_cart = JSON.parse(localStorage.getItem("nonuser_cart"));
      //로컬 스토리지에 있는 것들 db로 보내야?
      console.log("토큰 있음 - 회원!");

      let finaldata = nonuser_cart;

      (async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/v1/cart",
            config
          );
          console.log(response.data);

          finaldata = cartbooks.concat(response.data);
        } catch (e) {
          console.error(e);
        }
        //const cartbookData = response.data;
        //setcartbooks(cartbookData);
        setcartbooks(
          finaldata.map((cartbook) => ({ ...cartbook, isChecked: true }))
        );
        const defaultCartbooks = cartbooks.map((cartbook) => ({
          id: cartbook.id,
        }));
        console.log(defaultCartbooks);
        localStorage.setItem(
          "checkedcartbook",
          JSON.stringify(defaultCartbooks)
        );
      })();
    }, []);
  }

  const AllcheckHandler = (e) => {
    console.log("쓰레기통 클릭");

    let checkedcartbooks = localStorage.getItem("checkedcartbook");
    console.log("체크된 상품");
    console.log(checkedcartbooks);

    if (checkedcartbooks == null) {
      checkedcartbooks = [];
    } else {
      checkedcartbooks = JSON.parse(checkedcartbooks);
    }
    console.log("테스트1");
    let noncheck_cart = JSON.parse(localStorage.getItem("nonuser_cart")); //담겨있는 상품리스트

    Object.keys(checkedcartbooks).forEach(async (key) => {
      noncheck_cart = noncheck_cart.filter(
        (item) => item.id !== checkedcartbooks[key].id
      );
    });
    localStorage.removeItem("nonuser_cart");
    localStorage.setItem("nonuser_cart", JSON.stringify(noncheck_cart));

    Object.keys(checkedcartbooks).forEach(async (key) => {
      console.log(checkedcartbooks[key].id); // 로그 출력

      try {
        const response = await axios.delete(
          "http://localhost:8080/api/v1/cart",
          {
            ...config,
            data: {
              id: checkedcartbooks[key].id,
            },
          }
        );
        console.log(response.data);
        localStorage.removeItem("checkedcartbook");
        setcartbooks(
          response.data.map((cartbook) => ({ ...cartbook, isChecked: "true" }))
        );
      } catch (e) {
        console.error(e);
      }
    });
  };

  const [selectAll, setSelectAll] = useState(true);
  // 전체 선택
  const selectAllHandler = (e) => {
    const checked = e.target.checked; // 전체 선택 상태
    setSelectAll(checked);

    // 모든 카트북의 체크 상태를 변경
    const updatedCartbooks = cartbooks.map((cartbook) => ({
      ...cartbook,
      isChecked: checked, //전체 선택 상태임
    }));
    setcartbooks(updatedCartbooks); // 적용 -> check : {cartbook.isChecked} 이면 반영

    const localupdatedCartbooks = cartbooks.map((cartbook) => ({
      id: cartbook.id,
    }));
    console.log(localupdatedCartbooks);
    if (checked) {
      localStorage.removeItem("checkedcartbook");
      localStorage.setItem(
        "checkedcartbook",
        JSON.stringify(localupdatedCartbooks)
      );
    } else {
      localStorage.removeItem("checkedcartbook");
    }
  };

  // 카트북 체크박스
  const CartbookCheckboxhandler = (e, id, isChecked) => {
    const updatedCartbooks = cartbooks.map((cartbook) => {
      if (cartbook.id === id) {
        return { ...cartbook, isChecked: !isChecked };
      }
      return cartbook;
    });
    setcartbooks(updatedCartbooks);
    // 모든 카트북이 체크되었는지 확인
    const allChecked =
      updatedCartbooks.filter((cartbook) => cartbook.isChecked).length ===
      updatedCartbooks.length;
    setSelectAll(allChecked);
  };

  const finalTotalPrice = () => {
    const prices = cartbooks
      .filter((cartbook) => cartbook.isChecked)
      .map((cartbook) => cartbook.price * cartbook.count);
    const totalPrice = prices.reduce((acc, price) => acc + price, 0);
    return totalPrice;
  };

  const deliveryfee = () => {
    const totalprice = finalTotalPrice();
    if (totalprice >= 50000) return 0;
    else return 3000;
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>장바구니 테스트</h1>

      <p
        style={{
          width: "1050px",
          fontSize: "20px",
          margin: "8px auto",
        }}
      >
        장바구니 {/*({cartbooks.length})*/}
      </p>

      <div className={CartStyle.whole}>
        <div className="left">
          <div className={CartStyle.trashCard}>
            <input //전체 선택 박스
              style={{
                borderRadius: "50%",
                margin: "18px 0 0 20px",
              }}
              type="checkbox"
              checked={selectAll}
              onChange={(e) => selectAllHandler(e)}
            />
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                margin: "21px 0 0 5px",
              }}
            >
              전체 선택
            </p>
            <div //쓰레기통 버튼
              className={CartStyle.trashicon_back}
              onClick={(e) => AllcheckHandler(e)}
            >
              <img
                src="trash.png"
                style={{
                  width: "20px",
                  height: "25px",
                  margin: "auto",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          <div>
            {cartbooks.map((cartbook) => (
              <CartBook
                cartbook={cartbook}
                key={cartbook.id}
                isChecked={cartbook.isChecked}
                onChange={(e) =>
                  CartbookCheckboxhandler(e, cartbook.id, cartbook.isChecked)
                }
              />
            ))}
          </div>
        </div>

        <div className={CartStyle.cart_right}>
          <div className={CartStyle.right_card}>
            <div style={{}}>
              <div
                style={{
                  width: "200px",
                  height: "20px",
                  display: "flex",
                  margin: "0 auto 12px auto",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  상품 금액
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    fontWeight: "bold",
                  }}
                >
                  {finalTotalPrice()}
                </p>
              </div>

              <div
                style={{
                  width: "200px",
                  height: "20px",
                  margin: "0 auto 5px auto",
                  display: "flex",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                  }}
                >
                  배송비
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    marginLeft: "auto",
                  }}
                >
                  {deliveryfee()}
                </p>
              </div>

              <div
                style={{
                  width: "200px",
                  height: "20px",
                  display: "flex",
                  margin: "auto",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "gray",
                    marginLeft: "auto",
                  }}
                >
                  50,000원 이상 구매 시 배송비 무료
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "210px",
              width: "200px",
              margin: "0 auto",
              paddingTop: "35px",
            }}
          >
            <div
              style={{
                marginBottom: "20px",
                width: "200px",
                height: "65px",
              }}
            >
              <div className={CartStyle.rightcard_text}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  [결제 예상 금액]
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    marginLeft: "auto",
                    fontWeight: "bold",
                  }}
                >
                  {finalTotalPrice()}
                </p>
              </div>

              <div className={CartStyle.rightcard_text}>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#7F7F7F",
                  }}
                >
                  적립 예정 포인트
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    marginLeft: "auto",
                    color: "#7F7F7F",
                  }}
                >
                  [xx P]
                </p>
              </div>
            </div>
            <div className={CartStyle.orderbutton}>주문하기</div>
          </div>
        </div>
      </div>
      <div //장바구니 유의사항
        style={{
          width: "600px",
          height: "130px",
          margin: "150px auto 0 auto",
        }}
      >
        <details
          style={{
            backgroundColor: "#E0E0E0",
          }}
        >
          <summary role="button" className={CartStyle.cartnotice_button}>
            장바구니 유의사항
          </summary>
          <div className={CartStyle.cartnotice}>
            -택배 배송은 기본배송지 기준으로 진행됩니다.
          </div>
          <div className={CartStyle.cartnotice}>
            -상품별 배송일정이 서로 다를시 가장 늦은 일정의 상품 기준으로 모두
            함께 배송됩니다.
          </div>
        </details>
      </div>
    </div>
  );
}
