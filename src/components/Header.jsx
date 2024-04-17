import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const [isSignIn, setSignIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const refreshToken = window.localStorage.getItem("refresh_token");
    const accessToken = window.localStorage.getItem("access_token");

    if (refreshToken && accessToken) {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  }, [location]);

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const openModal = async (event) => {
    try {
      const response = await fetch("http://localhost:8080/v1/bookCategory");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
      setIsOpen(true);

      // 클릭한 메뉴 버튼의 위치를 기준으로 모달의 위치를 조정합니다.
      const rect = event.target.getBoundingClientRect();
      setModalPosition({ top: rect.bottom + 10, left: rect.left });
    } catch (error) {
      console.error("Error fetching categories: ", error.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ backgroundColor: "white", paddingBottom: 20 }}>
      {/* 회원가입, 로그인, 고객센터 링크 */}
      <div style={{ display: "flex", backgroundColor: "#F0EBEB", height: 50 }}>
        <nav style={{ marginLeft: "auto", marginRight: 50 }}>
          <ul>
            <li>
              <a href="/sign_up" style={{ fontSize: 15 }}>
                회원가입
              </a>
            </li>
            <li>|</li>
            <li>
              <a href="/sign_in" style={{ fontSize: 15 }}>
                로그인
              </a>
            </li>
            <li>|</li>
            <li>
              <a href="#" style={{ fontSize: 15 }}>
                고객센터
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* 로고 및 검색 입력 */}
      <div style={{ display: "flex", marginTop: 50 }}>
        <div style={{ marginLeft: "auto" }}>
          <a href="/">
            <img alt="logo" src="/img/bookstory.png" width={"30%"} />
          </a>
          <input
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            style={{
              backgroundColor: "white",
              width: "70%",
              height: 40,
              marginTop: "2%",
            }}
          />
        </div>
        <nav style={{ marginLeft: "auto" }}>
          <li>
            <a href="/cart">
              <button
                className="contrast"
                style={{
                  width: 60,
                  marginRight: "50%",
                  backgroundColor: "white",
                }}
              >
                <img
                  alt="shopping-cart"
                  src="/img/shopping-cart.svg"
                  width={"100"}
                />
              </button>
            </a>
          </li>
          <li>
            <a href="/mypage">
            <button
              className="contrast"
              style={{
                width: 60,
                marginRight: "10%",
                backgroundColor: "white",
              }}
              <img alt="user" src="/img/user.svg" width={"70"} />
            </button>
            </a>
          </li>
        </nav>
      </div>

      {/* 메뉴 버튼 */}
      <div style={{ display: "flex", marginTop: 80, justifyContent: "center" }}>
        <nav>
          <button
            id="menuButton"
            className="contrast"
            onClick={openModal}
            style={{ backgroundColor: "white" }}
          >
            <img alt="menu" src="/img/menu.svg" width={"40"} />
          </button>
          {/* 모달 창 */}
          {isOpen && (
            <div
              id="modal"
              className="modal"
              style={{
                position: "fixed",
                top: modalPosition.top,
                left: modalPosition.left,
                backgroundColor: "white",
                padding: "20px",
                border: "1px solid black",
                zIndex: "1000",
              }}
            >
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                {categories.map((category, index) => (
                  <p>
                    <a href={`/category/${category.id}`} key={index}>
                      {category.name}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          )}
          {/* 카테고리 메뉴 */}
          <ul>
            <li style={{ marginLeft: 50 }}>
              <Link to="/">베스트셀러</Link>
            </li>
            <li style={{ marginLeft: 50 }}>
              <Link to="/1">신간도서</Link>
            </li>
            <li style={{ marginLeft: 50 }}>
              <Link to="/2">추천도서</Link>
            </li>
            <li style={{ marginLeft: 50 }}>
              <Link to="/3">국내도서</Link>
            </li>
            <li style={{ marginLeft: 50 }}>
              <Link to="/4">해외도서</Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr width="100%" color="black" />
    </div>
  );
}
