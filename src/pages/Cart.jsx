import React from "react";
import { useState, useEffect } from "react";
import CartStyle from "../css/Cart.module.css";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { baseApiUrl } from "../constants/apiUrl";

export default function Cart() {
  const navigate = useNavigate();
  {
    /* 장바구니 조회 */
  }
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 660) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  const [cartbooks, setcartbooks] = useState([
    {
      id: "",
      bookId: "",
      itemName: "",
      price: "",
      image: "",
      count: "",
      stock: "",
      isbn: "",
    },
  ]);
  const [cart, setcart] = useState([]);

  useEffect(() => {
    const newCart = async () => {
      const accesstoken = localStorage.getItem("access"); // 로컬 스토리지에서 토큰 가져옴
      let nonuser_cart = JSON.parse(localStorage.getItem("nonuser_cart")); //로컬 스토리지의 비회원 장바구니 가져옴

      if (accesstoken === null) {
        if (nonuser_cart === null) nonuser_cart = [];
        const nonuser_cartbooks = nonuser_cart;

        //비회원 로직
        const nonuser_cartbooks1 = nonuser_cartbooks.map((cartbook) => ({
          ...cartbook,
          isChecked: true,
        })); //체크 박스 기본 상태: true

        const defaultCartbooks = nonuser_cartbooks.map((cartbook) => ({
          //체크된 아이디 목록에 추가
          id: cartbook.id,
        }));

        localStorage.setItem(
          "checkedcartbook",
          JSON.stringify(defaultCartbooks),
        );

        setcartbooks(nonuser_cartbooks1);
      } else {
        console.log(accesstoken);
        //회원 로직
        const config = {
          //헤더에 토큰 추가
          headers: {
            access: accesstoken,
          },
        };

        if (nonuser_cart != null) {
          //로컬 스토리지에 무언가 있으면; 회원 로그인전에 비회원으로 담은 장바구니가 있을 떄
          Object.keys(nonuser_cart).forEach(async (key) => {
            (async () => {
              try {
                const response = await axios.post(
                  //장바구니 db로 보내기
                  `${baseApiUrl}/api/v1/cart`,
                  {
                    id: "",
                    bookId: nonuser_cart[key].id,
                    count: nonuser_cart[key].count,
                  },
                  config,
                );
              } catch (e) {
                console.error(e);
              }
            })();

            (async () => {
              //db조회
              try {
                const response = await axios.get(
                  `${baseApiUrl}/api/v1/cart`,
                  config,
                );
                const nonuser_cartbooks = response.data;
                console.log(nonuser_cartbooks);
                setcartbooks(
                  nonuser_cartbooks.map((cartbook) => ({
                    ...cartbook,
                    isChecked: true,
                  })),
                );
                const defaultCartbooks = nonuser_cartbooks.map((cartbook) => ({
                  id: cartbook.id,
                }));
                localStorage.setItem(
                  "checkedcartbook",
                  JSON.stringify(defaultCartbooks),
                );
              } catch (e) {
                console.error(e);
              }
            })();
          });
          localStorage.removeItem("nonuser_cart");
        } else {
          (async () => {
            try {
              const response = await axios.get(
                `${baseApiUrl}/api/v1/cart`,
                config,
              );
              const nonuser_cartbooks = response.data;
              console.log(nonuser_cartbooks);
              setcartbooks(
                nonuser_cartbooks.map((cartbook) => ({
                  ...cartbook,
                  isChecked: true,
                })),
              );
              const defaultCartbooks = nonuser_cartbooks.map((cartbook) => ({
                id: cartbook.id,
              }));
              localStorage.setItem(
                "checkedcartbook",
                JSON.stringify(defaultCartbooks),
              );
            } catch (e) {
              console.error(e);
            }
          })();
        }
      }
    };
    newCart();
    const updatedCart = cartbooks;
    if (cartbooks != updatedCart) {
      setcart(updatedCart);
    }
  }, [cart]);

  {
    /* 체크박스 */
  }

  const CartBook = ({ cartbook, isChecked, onChange }) => {
    const [check, setcheck] = useState(true);
    const handleCheckboxChange = (e) => {
      const checked = e.target.checked; //isChecked
      onChange(checked); // 상태 변경?

      const checkbox = {
        id: cartbook.id,
      };
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
    const accesstoken = localStorage.getItem("access");

    const countUp = (e) => {
      if (count < cartbook.stock) {
        setCount((pre) => (pre += 1));
      } else {
        alert("재고보다 많은 수를 담을 수 없습니다.");
        return; // 함수 종료
      }

      let checkedbook = JSON.parse(localStorage.getItem("checkedcartbook"));
      if (accesstoken === null) {
        //비회원
        let updatecart = JSON.parse(localStorage.getItem("nonuser_cart"));

        Object.keys(updatecart).forEach(async (key) => {
          if (cartbook.id === updatecart[key].id) {
            updatecart[key].count = count + 1;
          }
        });

        const updatedCart = updatecart.map((cartbook) => {
          if (checkedbook.some((item) => item.id === cartbook.id)) {
            return {
              ...cartbook,
              isChecked: true,
            };
          }
          return {
            ...cartbook,
            isChecked: false,
          };
        });

        localStorage.setItem("nonuser_cart", JSON.stringify(updatecart));
        setcartbooks(updatedCart);
      } else {
        //회원
        const config = {
          headers: {
            access: accesstoken, //토큰
          },
        };
        (async () => {
          try {
            const response = await axios.put(
              `${baseApiUrl}/api/v1/cart`,
              {
                id: cartbook.id,
                bookId: "",
                count: count + 1,
              },
              config,
            );
            Object.keys(cartbooks).forEach(async (key) => {
              if (cartbooks[key].id === cartbook.id) {
                cartbooks[key].count = count + 1;
              }
            });
            if (checkedbook != null) {
              const updatedCart = cartbooks.map((cartbook) => {
                if (checkedbook.some((item) => item.id === cartbook.id)) {
                  return {
                    ...cartbook,
                    isChecked: true,
                  };
                }
                return {
                  ...cartbook,
                  isChecked: false,
                };
              });
              setcartbooks(updatedCart);
            }
          } catch (e) {
            console.error(e);
          }
        })();
      }
    };

    const countDown = () => {
      if (count > 1) {
        setCount((pre) => (pre -= 1));
      } else {
        alert("최소 수량은 1개 입니다.");
        return;
      }

      let checkedbook = JSON.parse(localStorage.getItem("checkedcartbook"));
      if (accesstoken === null) {
        let updatecart = JSON.parse(localStorage.getItem("nonuser_cart"));
        Object.keys(updatecart).forEach(async (key) => {
          if (cartbook.id === updatecart[key].id) {
            updatecart[key].count = count - 1;
            if (count - 1 < 1) updatecart[key].count = count;
          }
        });
        const updatedCart = updatecart.map((cartbook) => {
          if (checkedbook.some((item) => item.id === cartbook.id)) {
            return {
              ...cartbook,
              isChecked: true,
            };
          }
          return {
            ...cartbook,
            isChecked: false,
          };
        });

        localStorage.setItem("nonuser_cart", JSON.stringify(updatecart));
        setcartbooks(updatedCart);
      } else {
        //회원
        const config = {
          headers: {
            access: accesstoken, //토큰
          },
        };

        (async () => {
          try {
            const response = await axios.put(
              `${baseApiUrl}/api/v1/cart`,
              {
                id: cartbook.id,
                count: count - 1,
              },
              config,
            );
            Object.keys(cartbooks).forEach(async (key) => {
              if (cartbooks[key].id === cartbook.id) {
                cartbooks[key].count = count - 1;
              }
            });
            if (checkedbook != null) {
              const updatedCart = cartbooks.map((cartbook) => {
                if (checkedbook.some((item) => item.id === cartbook.id)) {
                  return {
                    ...cartbook,
                    isChecked: true,
                  };
                }
                return {
                  ...cartbook,
                  isChecked: false,
                };
              });
              setcartbooks(updatedCart);
            }
          } catch (e) {
            console.error(e);
          }
        })();
      }
    };

    const ImageClickHandler = (e) => {
      const num = cartbook.bookId;
      console.log(num);
      navigate(`/book/${num}`);
    };

    {
      /*한 권 당 총 금액*/
    }
    const totalprice = cartbook.price * count;
    //장바구니 상품 부분
    return (
      <div className={CartStyle.whole_card}>
        <div
          className={CartStyle.card1} //이미지, 제목, 한 권당 가격
        >
          <input
            className="checkbox"
            style={{
              borderRadius: "50%",
              cursor: "pointer",
              margin: "15px 0 0 20px",
            }}
            type="checkbox"
            checked={cartbook.isChecked}
            onChange={handleCheckboxChange}
          ></input>
          <div
            className={CartStyle.book_image} //이미지
          >
            <img
              src={
                `img/images/${cartbook.isbn}.jpg` ||
                "https://source.unsplash.com/featured/?book"
              }
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={ImageClickHandler}
            />
          </div>
          <div //제목, 가격
            className={CartStyle.titlepart}
          >
            [{cartbook.itemName}]<div>[{cartbook.price}]</div>
          </div>
        </div>

        <div //한 권 당 총 가격, 버튼
          className={CartStyle.buttonpart}
        >
          <div
            className={CartStyle.totalprice} //총 가격
          >
            {totalprice}
          </div>

          <div className={CartStyle.countpart}>
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
  };

  {
    /*삭제*/
  }
  const AllcheckHandler = (e) => {
    const accesstoken = localStorage.getItem("access");
    let checkedcartbooks = localStorage.getItem("checkedcartbook");

    if (checkedcartbooks == null) {
      checkedcartbooks = [];
    } else {
      checkedcartbooks = JSON.parse(checkedcartbooks);
    }

    if (accesstoken === null) {
      let noncheck_cart = JSON.parse(localStorage.getItem("nonuser_cart")); //담겨있는 상품리스트
      Object.keys(checkedcartbooks).forEach(async (key) => {
        noncheck_cart = noncheck_cart.filter(
          (item) => item.id !== checkedcartbooks[key].id,
        );
      });
      localStorage.removeItem("nonuser_cart");
      localStorage.setItem("nonuser_cart", JSON.stringify(noncheck_cart));
      setcartbooks(
        noncheck_cart.map((cartbook) => ({ ...cartbook, isChecked: false })),
      );
    } else {
      const config = {
        headers: {
          access: accesstoken,
        },
      };

      Object.keys(checkedcartbooks).forEach(async (key) => {
        try {
          const response = await axios.delete(
            `${baseApiUrl}/api/v1/cart/${checkedcartbooks[key].id}`,
            config,
          );
          const newCartResponse = await axios.get(
            `${baseApiUrl}/api/v1/cart`,
            config,
          );
          const newCartbooks = newCartResponse.data;
          setcartbooks(newCartbooks);
          localStorage.removeItem("checkedcartbook");
        } catch (e) {
          console.error(e);
        }
      });
    }
  };

  {
    /* 체크박스 */
  }
  const [selectAll, setSelectAll] = useState(true);
  // 전체 선택
  const selectAllHandler = (e) => {
    const checked = e.target.checked; // 전체 선택 상태
    setSelectAll(checked);

    // 모든 카트북의 체크 상태를 변경
    const updatedCartbooks = cartbooks.map((cartbook) => ({
      ...cartbook,
      isChecked: checked, //전체 선택 상태
    }));
    setcartbooks(updatedCartbooks); // 적용 -> check : {cartbook.isChecked} 이면 반영

    const localupdatedCartbooks = cartbooks.map((cartbook) => ({
      id: cartbook.id,
    }));
    if (checked) {
      localStorage.removeItem("checkedcartbook");
      localStorage.setItem(
        "checkedcartbook",
        JSON.stringify(localupdatedCartbooks),
      );
    } else {
      localStorage.removeItem("checkedcartbook");
    }
  };

  // 카트북 체크박스 관리
  const CartbookCheckboxhandler = (e, id, isChecked) => {
    const updatedCartbooks = cartbooks.map((cartbook) => {
      if (cartbook.id === id) {
        return { ...cartbook, isChecked: !isChecked };
      }
      return cartbook;
    });
    setcartbooks(updatedCartbooks);
    // 모든 카트북이 체크되었는지 확인하는 부분
    const allChecked =
      updatedCartbooks.filter((cartbook) => cartbook.isChecked).length ===
      updatedCartbooks.length;
    setSelectAll(allChecked);
  };

  {
    /* 총 결제 금액 */
  }
  const finalTotalPrice = () => {
    const prices = cartbooks
      .filter((cartbook) => cartbook.isChecked)
      .map((cartbook) => cartbook.price * cartbook.count);
    let totalPrice = prices.reduce((acc, price) => acc + price, 0);
    // 이하영 : totalPrice를 localStorage에 저장하겠습니다!
    localStorage.setItem("totalPrice", totalPrice);

    return totalPrice;
  };

  {
    /* 배송비 설정 */
  }
  const deliveryfee = () => {
    const totalprice = finalTotalPrice();
    if (totalprice >= 50000) return 0;
    else return 3000;
  };

  const point = () => {
    const totalPrice = finalTotalPrice();
    return totalPrice * 0.02;
  };

  const cartCount = () => {
    const checkedcartbook = JSON.parse(localStorage.getItem("checkedcartbook"));
    if (checkedcartbook === null) return 0;
    else {
      return checkedcartbook.length;
    }
  };

  const orderBtnHandler = () => {
    let accesstoken = JSON.parse(localStorage.getItem("access"));
    if (accesstoken === null) {
      alert("주문하려면 로그인을 해주세요!");
      navigate("/sign_in");
    } else {
      //주문 화면?
      navigate("/order");
    }
  };

  //장바구니 전체
  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <HelmetProvider>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
        </Helmet>
      </HelmetProvider>

      <p className={CartStyle.carttop}>장바구니 ({cartCount()})</p>
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
            <p className={CartStyle.allselect}>전체 선택</p>
            <div //쓰레기통 버튼
              className={CartStyle.trashicon_back}
              onClick={(e) => AllcheckHandler(e)}
            >
              <img src="trash.png" className={CartStyle.imgstyle} />
            </div>
          </div>

          <div>
            {cartbooks.map((cartbook) => (
              <CartBook
                cartbook={cartbook}
                key={cartbook.id}
                value={cartbook.count}
                isChecked={cartbook.isChecked}
                onChange={(e) =>
                  CartbookCheckboxhandler(e, cartbook.id, cartbook.isChecked)
                }
              />
            ))}
          </div>
        </div>

        {/*</div><div className={CartStyle.cart_right}>*/}
        <div
          className={`${CartStyle.cart_right} ${isSticky ? CartStyle.sticky : ""}`}
        >
          <div className={CartStyle.right_card}>
            <div className={CartStyle.right_cart_div}>
              <div className={CartStyle.rightcard_text}>
                <p className={CartStyle.price_text}>상품 금액</p>
                <p className={CartStyle.final_total}>{finalTotalPrice()}</p>
              </div>

              <div className={CartStyle.right_cart3}>
                <p className={CartStyle.deliveryfee}>배송비</p>
                <p className={CartStyle.deliveryfee_text}>{deliveryfee()}</p>
              </div>

              <div className={CartStyle.deliverynotice}>
                <p className={CartStyle.deliverynotice_text}>
                  50,000원 이상 구매 시 배송비 무료
                </p>
              </div>
            </div>
          </div>
          <div className={CartStyle.pricetopcard}>
            <div className={CartStyle.price_card2}>
              <div className={CartStyle.rightcard_text}>
                <p className={CartStyle.rightcard_text2}>[결제 예상 금액]</p>
                <p className={CartStyle.rightcard_text3}>
                  {finalTotalPrice() + deliveryfee()}
                </p>
              </div>
              <div className={CartStyle.rightcard_text}>
                <p className={CartStyle.point_text}>적립 예정 포인트</p>
                <p className={CartStyle.point_text2}>{point()}</p>
              </div>
            </div>
            <div className={CartStyle.orderbutton} onClick={orderBtnHandler}>
              주문하기
            </div>
          </div>
        </div>
      </div>
      <div className={CartStyle.notice_card}>
        <details
          style={{
            backgroundColor: "#E0E0E0",
          }}
        >
          <summary
            role="button"
            style={{
              backgroundColor: "#E0E0E0",
              border: "none",
              color: "black",
            }}
            className={CartStyle.cartnotice_button}
          >
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
