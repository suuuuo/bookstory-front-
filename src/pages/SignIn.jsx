import axios from "axios";
import { useState } from "react";
import { baseApiUrl } from "../constants/apiUrl";
import { useNavigate } from "react-router-dom";

const onNaverLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/naver";
};

const onGoogleLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

export default function SignIn() {
  const [signInInputData, setSignInInputData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signInInputData;
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignInInputData({
      ...signInInputData,
      [name]: value,
    });
  };

  const signIn = () => {
    (async () => {
      try {
        // 로그인 요청
        const response = await axios.post(
          `${baseApiUrl}/login`,
          signInInputData,
          {
            withCredentials: true,
          },
        );
        // 로그인 처리
        const access = response.headers.access;

        window.localStorage.setItem("access", access);

        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    })();
  };

  return (
    <div
      style={{
        width: "100vw",
        margin: "60px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          paddingTop: "40px",
        }}
      >
        <h3>로그인</h3>
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={password}
          onChange={onChange}
        />
        <button onClick={signIn}>로그인</button>

        <button onClick={onNaverLogin}>Naver Login</button>
        <button onClick={onGoogleLogin}>Google Login</button>
      </div>
    </div>
  );
}
