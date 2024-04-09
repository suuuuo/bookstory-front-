import { useNavigate } from "react-router-dom";

export default function Books() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          width: "1000px",
          height: "400px",
          margin: "auto",
          padding: "30px 0px 0 80px",
        }}
      >
        <img
          src="/경제.png"
          width="20%"
          style={{ marginRight: "30px", cursor: "pointer" }}
          onClick={() => navigate("/Book1")}
        ></img>
        <img
          src="/고양이.png"
          width="20%"
          style={{ marginRight: "30px", cursor: "pointer" }}
          onClick={() => navigate("/Book2")}
        ></img>
        <img
          src="/시간관리.png"
          width="20%"
          style={{ marginRight: "30px", cursor: "pointer" }}
          onClick={() => navigate("/Book3")}
        ></img>
        <img
          src="/퇴근.png"
          width="20%"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/Book4")}
        ></img>
      </div>
    </div>
  );
}
