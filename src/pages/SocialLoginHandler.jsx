import { useEffect } from "react";
import { baseApiUrl } from "../constants/apiUrl";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function SocialLoginHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isSocialLoginSuccess = searchParams.get("social_login") === "success";

    if (isSocialLoginSuccess) {
      console.log("Current cookies:", document.cookie);

      console.log(isSocialLoginSuccess);
      // 소셜 로그인 성공 후 액세스 토큰 재발행 로직
      axios
        .post(
          `${baseApiUrl}/api/v1/tokens/reissue`,
          {},
          { withCredentials: true },
        )
        .then((response) => {
          const access = response.headers.access;

          window.localStorage.setItem("access", access);

          navigate("/");
        })
        .catch((error) => {
          console.error("액세스 토큰 갱신 실패:", error);
        });
    }
  }, [navigate, location]);
}
