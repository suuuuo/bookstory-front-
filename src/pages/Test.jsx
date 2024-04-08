import React, { useState } from "react";
import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl";

export default function Test() {
  const [responseData, setResponseData] = useState(""); // API 응답을 저장할 state
  const access = localStorage.getItem("access");

  console.log(access);
  axios
    .post(
      `${baseApiUrl}/api/v1/test`,
      {},
      {
        headers: {
          access: `${access}`, // 요청 헤더에 액세스 토큰 추가
        },
      },
    )
    .then((response) => {
      setResponseData(response.Data);

      console.log(response);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("API 호출 중 에러 발생:", error);
    });
}
