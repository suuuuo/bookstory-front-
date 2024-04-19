import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl.js";

const BookSave = () => {
  const [categoriesLevel1, setCategoriesLevel1] = useState([]); // 첫 번째 드롭다운 리스트의 데이터
  const [categoriesLevel2, setCategoriesLevel2] = useState([]); // 두 번째 드롭다운 리스트의 데이터
  const [categoriesLevel3, setCategoriesLevel3] = useState([]); // 세 번째 드롭다운 리스트의 데이터
  const [selectedCategoryLevel1, setSelectedCategoryLevel1] = useState(""); // 첫 번째 드롭다운 리스트에서 선택된 값
  const [selectedCategoryLevel2, setSelectedCategoryLevel2] = useState(""); // 두 번째 드롭다운 리스트에서 선택된 값
  const [selectedCategoryLevel3, setSelectedCategoryLevel3] = useState(""); // 세 번째 드롭다운 리스트에서 선택된 값
  const [newBook, setNewBook] = useState({
    itemName: "",
    price: 0,
    author: "",
    description: "",
    publisher: "",
  });

  useEffect(() => {
    // 카테고리 데이터를 가져오는 함수
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/api/v1/bookCategory`);
        setCategoriesLevel1(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // 두 번째 드롭다운 리스트의 데이터를 가져오는 함수
    const fetchCategoriesLevel2 = async () => {
      if (selectedCategoryLevel1) {
        try {
          const response = await axios.get(
            `${baseApiUrl}/api/v1/bookCategory/lowRank/${selectedCategoryLevel1}`,
          );
          setCategoriesLevel2(response.data);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      }
    };

    fetchCategoriesLevel2();
  }, [selectedCategoryLevel1]);

  useEffect(() => {
    // 세 번째 드롭다운 리스트의 데이터를 가져오는 함수
    const fetchCategoriesLevel3 = async () => {
      if (selectedCategoryLevel2) {
        try {
          const response = await axios.get(
            `${baseApiUrl}/api/v1/bookCategory/lowRank/${selectedCategoryLevel2}`,
          );
          setCategoriesLevel3(response.data);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      }
    };

    fetchCategoriesLevel3();
  }, [selectedCategoryLevel2]);

  const handleCategoryLevel1Change = (event) => {
    setSelectedCategoryLevel1(event.target.value);
    setSelectedCategoryLevel2("");
    setSelectedCategoryLevel3("");
  };

  const handleCategoryLevel2Change = (event) => {
    setSelectedCategoryLevel2(event.target.value);
    setSelectedCategoryLevel3("");
  };

  const handleCategoryLevel3Change = (event) => {
    setSelectedCategoryLevel3(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const headers = { access: ` ${token.trim()}` };

    try {
      // 먼저 새 책을 추가하는 API 호출
      const response = await axios.post(
        `${baseApiUrl}/api/v1/books/save`,
        newBook,
        { headers },
      );
      alert("Book added successfully!");
      console.log(response.data);

      const { id } = response.data;

      // 선택된 카테고리들의 ID를 사용하여 API로 데이터를 보내는 함수
      const categoryResponse = await axios.post(
        `${baseApiUrl}/api/v1/bookCategory/add`,
        {
          bookId: id,
          categoryLevel1: selectedCategoryLevel1,
          categoryLevel2: selectedCategoryLevel2,
          categoryLevel3: selectedCategoryLevel3,
        },
      );
      console.log("Category data sent successfully:", categoryResponse.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add the book or send category data");
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}
    >
      <form onSubmit={handleBookSubmit} className="card">
        <h1>Add New Book</h1>

        {/* 책 정보 입력 폼 */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="itemName"
            value={newBook.itemName}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={newBook.price}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newBook.description}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Publisher</label>
          <input
            type="text"
            name="publisher"
            value={newBook.publisher}
            onChange={handleChange}
            required
            className="input"
          />
          {/* 첫 번째 드롭다운 리스트 */}

          <label>Category</label>
          <select
            value={selectedCategoryLevel1}
            onChange={handleCategoryLevel1Change}
          >
            <option value="">-- Select an option --</option>
            {categoriesLevel1.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* 두 번째 드롭다운 리스트 */}

          <select
            value={selectedCategoryLevel2}
            onChange={handleCategoryLevel2Change}
          >
            <option value="">-- Select an option --</option>
            {categoriesLevel2.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* 세 번째 드롭다운 리스트 */}
          <select
            value={selectedCategoryLevel3}
            onChange={handleCategoryLevel3Change}
          >
            <option value="">-- Select an option --</option>
            {categoriesLevel3.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookSave;
