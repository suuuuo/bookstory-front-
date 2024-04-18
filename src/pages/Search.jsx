import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const { keyword } = useParams();
    const [book, setBook] = useState([]);
    const [lowRankCategory, setLowRankCategory] = useState([]);
    const [rankCategory, setRankCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showSecondTable, setShowSecondTable] = useState(false);
    const [showThirdTable, setShowThirdTable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const categoryResponse = await axios.get(
              `http://localhost:8080/v1/bookCategory`,
            );
            setCategories(categoryResponse.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);
    

    const handleCategoryListClick = (categoryId) => {
        window.location.href = `/category/${categoryId}`;
      };
    
      const handleCategoryClick = async (categoryId) => {
        try {
          const response = await axios.get(
            `http://localhost:8080/v1/bookCategory/lowRank/${categoryId}`,
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
            `http://localhost:8080/v1/bookCategory/lowRank/${categoryId}`,
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
  )};
  </div>
  );
};
export default Search;
