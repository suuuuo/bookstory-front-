import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseApiUrl } from "../../constants/apiUrl";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();
  const access = localStorage.getItem("access");
  const config = {
    headers: {
      access: `${access}`,
    },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/api/v1/users?page=${page}`,
          config,
        );
        const data = response.data;
        console.log(data);
        if (data && Array.isArray(data.content)) {
          setUsers(data.content);
        } else {
          console.error("Invalid or no content available");
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [page]);

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/admin_user_edit/${id}`);
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      const deleteConfig = {
        ...config,
        data: {
          password: password,
        },
      };
      console.log(password);
      await axios.delete(`${baseApiUrl}/api/v1/users/${id}`, deleteConfig);
      setUsers(users.filter((user) => user.id !== currentUserId));
      navigate(`/admin_user_list`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setShowModal(false);
  };

  const promptDelete = (id) => {
    setCurrentUserId(id);
    setShowModal(true);
  };

  return (
    <div>
      <h1>유저 관리</h1>
      <table>
        <thead>
          <tr>
            <th>가입날짜</th>
            <th>이메일</th>
            <th>이름</th>
            <th>권한</th>
            <th>회원가입 방식</th>
            <th>탈퇴여부</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.createdAt}</td>
              <td>{user.email}</td>
              <td>{user.userName}</td>
              <td>{user.role}</td>
              <td>{user.loginType}</td>
              <td>{user.isExist ? "No" : "Yes"}</td>
              <td>
                {user.isExist && (
                  <button
                    style={{
                      backgroundColor: "red",
                      padding: "1px 3px",
                      color: "white",
                      border: "none",
                      borderRadius: "1px",
                      cursor: "pointer",
                    }}
                    onClick={() => promptDelete(user.id)}
                  >
                    탈퇴
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(user.id)}>수정하기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleDelete(currentUserId)}>
            Confirm Delete
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
}
