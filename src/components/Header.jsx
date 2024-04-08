import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function Header() {
  const [isSignIn, setSignIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const refrash_token = window.localStorage.getItem("refrash_token");
    const access_token = window.localStorage.getItem("access_token");

    if (refrash_token && access_token) {
      setSignIn(true);
      return;
    }
    setSignIn(false);
  }, [location]);

  return (
    <nav
      style={{
        padding: "20px",
        borderBottom: "1px solid black",
      }}
    >
      <ul>
        <li>
          <a href="/">
            <strong>엘리스 2팀 쇼핑몰</strong>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">핫딜</a>
        </li>
        <li>
          <a href="#">카테고리</a>
        </li>
        {isSignIn ? (
          <li>
            <a href="/mypage">마이페이지</a>
          </li>
        ) : (
          <>
            <li>
              <a href="/sign_in">로그인</a>
            </li>
            <li>
              <a href="/sign_up">회원가입</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
