import React, { useState } from 'react';
import axios from 'axios';
import { baseApiUrl } from "../constants/apiUrl.js";

function BookCreate() {
  const [newBook, setNewBook] = useState({
    itemName: '',
    price: 0,
    author: '',
    description: '',
    publisher: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const headers = { access: ` ${token.trim()}` };

    try {

      const response = await axios.post(`${baseApiUrl}/api/v1/books/save`, newBook, { headers });
      alert('Book added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add the book');
    }
  };

  return (
      <div className="container" style={{ maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
        <form onSubmit={handleSubmit} className="card">
          <h1>Add New Book</h1>
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
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  );
}

export default BookCreate;
