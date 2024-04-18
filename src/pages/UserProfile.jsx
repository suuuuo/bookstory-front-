import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const access = localStorage.getItem("access");
  const config = {
    headers: {
      access: `${access}`,
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/api/v1/users/me`,
          config,
        );
        const data = response.data;
        // console.log(response);
        setUser(data);
        setUserName(data.userName);
        setDateOfBirth(data.dateOfBirth);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setError(null);
      } catch (err) {
        // console.error("Error fetching user data:", err);
        setError("유저 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("유효하지 않은 이메일 형식입니다. ex) user@gmail.com");
      return;
    }
    if (!/^010-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      alert("유효하지 않은 휴대폰 번호 형식입니다. ex)010-1111-2222");
      return;
    }

    try {
      const access = localStorage.getItem("access");
      const response = await axios.patch(
        `${baseApiUrl}/api/v1/users/me`,
        {
          userName,
          dateOfBirth,
          email,
          phoneNumber,
          address,
        },
        config,
      );
      setUser(response.data);
      alert("성공적으로 수정했습니다!");
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDelete = async (id) => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const deleteConfig = {
        ...config,
        data: {
          password: password,
        },
      };
      console.log(password);

      await axios.delete(`${baseApiUrl}/api/v1/users/me`, deleteConfig);

      await axios.post(
        `${baseApiUrl}/api/v1/logout`,
        {},
        { withCredentials: true },
      );
      console.log("after post call");
      localStorage.removeItem("access");
      alert("회원 탈퇴 처리되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("오류가 발생했습니다.");
    }

    setShowModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>회원 정보 관리</h1>
      {user ? (
        <div>
          <div>
            <label>이름</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label>생년월일</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>휴대폰 번호</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label>주소</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                marginBottom: "4px",
                fontWeight: "bold",
              }}
            >
              포인트
            </div>
            <div
              style={{
                display: "block",
                padding: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#808080",
                borderRadius: "4px",
              }}
            >
              {user.point}
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                marginBottom: "4px",
                fontWeight: "bold",
              }}
            >
              등급
            </div>
            <div
              style={{
                display: "block",
                padding: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#808080",
                borderRadius: "4px",
              }}
            >
              {user.role}
            </div>
          </div>

          <button onClick={handleUpdate}>정보 수정</button>

          <button
            style={{
              backgroundColor: "red",
              padding: "16px 40px",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setShowModal(true)}
          >
            탈퇴
          </button>

          {showModal && (
            <div
              style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                zIndex: 1000,
              }}
            >
              <h2>비밀번호 확인</h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: "10px 0" }}
              />
              <button onClick={() => handleDelete(user.id)}>탈퇴 확인</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
