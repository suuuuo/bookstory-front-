import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../constants/apiUrl.js";

const BookCategory = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; 
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const [lowRankCategory, setLowRankCategory] = useState([]);
  const [rankCategory, setRankCategory] = useState([]);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [showThirdTable, setShowThirdTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/v1/bookCategory/bring/${id}`,
        );
        setBooks(response.data);

        const categoryResponse = await axios.get(
          `${baseApiUrl}/v1/bookCategory`,
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // 이전 페이지로 이동
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(books.length / itemsPerPage) - 1),
    ); // 다음 페이지로 이동
  };

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

  // 리액트 컴포넌트 함수의 반환값은 항상 최상위에 프레그먼트를 작성해야한다.
  return (
    <>
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
                  style={{ fontSize: "15px" }}
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
                    style={{ fontSize: "15px" }}
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
                    style={{ fontSize: "15px" }}
                    onClick={() => handleCategoryListClick(category.id)}
                  >
                    {category.name}
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        )}

        <div
          style={{
            marginLeft: "300px",
            display: "flex",
            flexDirection: "column",
            left: "300",
            
          }}
        >
          {books
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((book, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(book.bookId)}
                style={{
                  
                  display: "flex",
                  alignItems: "center",
                  width: "1000px",
                  height: "300px",
                  margin: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
            src={`/img/images/${book.isbn}.jpg`}
            alt="책 사진"
            className="book-image"
            style={{width: "25%", height: "80%", marginRight: "50px"}}
          />
                <div
                  className="card-content"
                  style={{ padding: "10px", flex: "1" }}
                >
                  <p className="title">{book.itemName}</p>
                  <p>작가 : {book.author}</p>
                  <p>출판사 : {book.publisher}</p>
                  <p>가격 : {book.price} 원</p>
                  <p>
                    {book.category.map((category, index) => (
                      <React.Fragment key={index}>
                        {category}
                        {index < book.category.length - 1 && " > "}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(books.length / itemsPerPage) - 1
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookCategory;
