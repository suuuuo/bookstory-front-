import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'; // useParams 훅 import

export default function BookDetail() {

    const [book, setBook] = useState({
        itemName: '',
        author: '',
        price: '',
        publisher: '',
        description: '',
        image: ''
    });

    const {bookId} = useParams(); // URL에서 bookId 파라미터 값을 가져옴

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // 동적으로 bookId를 URL에 삽입하여 API 요청
                const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
                setBook(response.data);
            } catch (error) {
                console.error('책 정보를 가져오는데 실패했습니다.', error);
            }
        };

        fetchBookDetails();
    }, [bookId]); // bookId가 변경될 때마다 useEffect 내의 로직을 다시 실행


    return (
        <div>
            <h2>책 설명</h2>
            <p>{book.description}</p>
        </div>
    );
}
