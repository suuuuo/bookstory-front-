import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl.js";

const Search = () => {
  const { keyword } = useParams();
  const [book, setBook] = useState({
    itemName: "",
    author: "",
    price: "",
    publisher: "",
    description: "",
    image: "",
  });
  const [lowRankCategory, setLowRankCategory] = useState([]);
  const [rankCategory, setRankCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [showThirdTable, setShowThirdTable] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          `${baseApiUrl}/v1/bookCategory`,
        );
        setCategories(categoryResponse.data);

        const bookResponse = await axios.get(
          `${baseApiUrl}/api/v1/books/title?title=${keyword}`,
        );

        setBook(bookResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [keyword]);

  const handleCardClick = (bookId) => {
    window.location.href = `/book/${bookId}`;
  };

  const handleCategoryListClick = (categoryId) => {
    window.location.href = `/category/${categoryId}`;
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/v1/bookCategory/lowRank/${categoryId}`,
      );
      console.log(response.data);
      setRankCategory(response.data);
      setShowSecondTable(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handlelowCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(
        `${baseApiUrl}/v1/bookCategory/lowRank/${categoryId}`,
      );
      console.log(response.data);
      setLowRankCategory(response.data);
      setShowThirdTable(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFirstTableClick = () => {
    setShowSecondTable(false);
    setShowThirdTable(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <table
        style={{
          width: "20px",
          height: "80%",
          marginLeft: "30px",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          {categories.map((category, index) => (
            <tr
              key={index}
              style={{ padding: "1px", textAlign: "center" }}
              scope="col"
              onClick={handleFirstTableClick}
            >
              <td
                style={{ fontSize: "10px" }}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </td>
            </tr>
          ))}
        </thead>
      </table>
      {showSecondTable && (
        <table
          style={{
            width: "30px",
            height: "80%",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            {rankCategory.map((category, index) => (
              <tr
                key={index}
                style={{ padding: "1px", textAlign: "center" }}
                scope="col"
              >
                <td
                  style={{ fontSize: "10px" }}
                  onClick={() => handlelowCategoryClick(category.id)}
                >
                  {category.name}
                </td>
              </tr>
            ))}
          </thead>
        </table>
      )}
      {showThirdTable && (
        <table
          style={{
            height: "80%",
            width: "20px",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            {lowRankCategory.map((category, index) => (
              <tr
                key={index}
                style={{ padding: "1px", textAlign: "center" }}
                scope="col"
              >
                <td
                  style={{ fontSize: "10px" }}
                  onClick={() => handleCategoryListClick(category.id)}
                >
                  {category.name}
                </td>
              </tr>
            ))}
          </thead>
        </table>
      )}
      ;
      <div
        onClick={() => handleCardClick(book.bookId)}
        style={{
          display: "flex",
          alignItems: "center",
          width: "1000px",
          height: "300px",
          margin: "10px",
          marginLeft: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={`/img/images/${book.isbn}.jpg`}
          alt="책 사진"
          className="book-image"
          style={{ width: "25%", height: "80%", marginRight: "50px" }}
        />
        <div className="card-content" style={{ padding: "10px", flex: "1" }}>
          <p className="title">{book.itemName}</p>
          <p>작가 : {book.author}</p>
          <p>출판사 : {book.publisher}</p>
          <p>가격 : {book.price} 원</p>
        </div>
      </div>
    </div>
  );
};
export default Search;
