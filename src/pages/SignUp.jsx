import axios from "axios";
import { useState } from "react";
import { baseApiUrl } from "../constants/apiUrl";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [signUpInputData, setSignUpInputData] = useState({
    email: "",
    userName: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
  });
  const { email, userName, password, passwordCheck, phoneNumber } =
    signUpInputData;
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignUpInputData({
      ...signUpInputData,
      [name]: value,
    });
  };

  const signUp = () => {
    if (password.length < 4) {
      alert("비밀번호는 4자리 이상이어야 합니다.");
      return;
    }

    if (password !== passwordCheck) {
      alert("입력하신 두 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    if (!/^010-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      alert("유효하지 않은 휴대폰 번호 형식입니다.");
      return;
    }

    (async () => {
      try {
        const response = await axios.post(
          `${baseApiUrl}/api/v1/signup`,
          signUpInputData,
        );
        alert("회원가입에 성공했습니다. 로그인 하세요.");
        navigate("/sign_in");
      } catch (error) {
        if (error.response) {
          console.log(error);
          alert(error.response.data.msg);
        } else {
          alert("회원가입 처리 중 문제가 발생했습니다.");
        }
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
        <h2>환영합니다!</h2>
        <div>이메일</div>
        <input
          name="email"
          type="email"
          placeholder="elice@gmail.com"
          value={email}
          onChange={onChange}
        />
        <div>이름</div>
        <input
          name="userName"
          type="uerName"
          placeholder="이름을 입력해 주세요."
          value={userName}
          onChange={onChange}
        />
        <div>비밀번호</div>
        <input
          name="password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={password}
          onChange={onChange}
        />
        <div>비밀번호 확인</div>
        <input
          name="passwordCheck"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={passwordCheck}
          onChange={onChange}
        />
        <div>휴대폰 번호</div>
        <input
          name="phoneNumber"
          type="phoneNumber"
          placeholder="010-1111-2222"
          value={phoneNumber}
          onChange={onChange}
        />
        <button onClick={signUp}>회원가입</button>
      </div>
    </div>
  );
}
