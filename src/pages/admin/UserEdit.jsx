import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseApiUrl } from "../../constants/apiUrl";
import { useNavigate } from "react-router-dom";

export default function UserEdit() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    userName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "",
    point: "",
    role: "",
  });

  const [originalUser, setOriginalUser] = useState({});
  const access = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `${baseApiUrl}/api/v1/users/${userId}`,
          {
            headers: {
              access: `${access}`,
            },
          },
        );
        console.log(response);
        setUser(response.data);
        setOriginalUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, phoneNumber } = user;

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("유효하지 않은 이메일 형식입니다. ex) user@gmail.com");
      return;
    }

    if (!/^010-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      alert("유효하지 않은 휴대폰 번호 형식입니다. ex)010-1111-2222");
      return;
    }

    const updatedFields = {};

    Object.keys(user).forEach((key) => {
      if (user[key] !== originalUser[key]) {
        updatedFields[key] = user[key];
      }
    });

    if (Object.keys(updatedFields).length > 0) {
      try {
        const response = await axios.patch(
          `${baseApiUrl}/api/v1/users/${userId}`,
          updatedFields,
          {
            headers: {
              access: `${access}`,
            },
          },
        );
        console.log(response);
        alert("성공적으로 수정되었습니다.");
        navigate(`/admin_user_list`);
        console.log("User updated successfully:", response.data);
      } catch (error) {
        console.error("Failed to update user:", error);
        alert("업데이트에 실패했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />
      </label>
      <label>
        생년월일
        <input
          type="date"
          name="dateOfBirth"
          value={user.dateOfBirth}
          onChange={handleChange}
        />
      </label>
      <label>
        이메일
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <label>
        휴대전화번호
        <input
          type="text"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        주소
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
        />
      </label>
      <label>
        포인트
        <input
          type="text"
          name="point"
          value={user.point}
          onChange={handleChange}
        />
      </label>
      <label>
        권한
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update User</button>
    </form>
  );
}
