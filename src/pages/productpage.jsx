import React, { useState } from 'react';
import BookDetail from './bookdetail.jsx'; // 상품 정보 컴포넌트
import QnA from './QnA'; // Q&A 컴포넌트

export default function ProductPage() {
    const [activeSection, setActiveSection] = useState('bookDetail'); // 활성 섹션을 제어하는 상태

    return (
        <div>
            <button onClick={() => setActiveSection('bookDetail')}>상품 정보</button>
            <button onClick={() => setActiveSection('qna')}>Q&A</button>
            {activeSection === 'bookDetail' && <BookDetail />}
            {activeSection === 'qna' && <QnA />}
        </div>
    );
}