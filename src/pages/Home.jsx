import { useState, useEffect } from "react";
import Button, { Button2 } from "../Components/Button";

export default function Home() {
  const [count, setCount] = useState(0);
  let countVar = 0;

  const countUp = () => {
    setCount((pre) => (pre += 1));
    console.log(countVar);
  };
  const countVarUp = () => {
    countVar += 1;
    console.log(countVar);
  };

  // const [data, setData] = useState("Nothing...");
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000");
  //       const data = await response.text();
  //       setData(data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // });

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Home</h1>

      <h3>일반 변수</h3>
      <h4 onClick={countVarUp}>{countVar}</h4>
      <h3>상태 변수</h3>
      <h4 onClick={countUp}>{count}</h4>

      {/* <div>{data}</div> */}
    </div>
  );
}
