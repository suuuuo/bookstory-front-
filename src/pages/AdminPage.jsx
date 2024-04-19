import "../css/AdminPage.css";

export default function MyPage() {
  return (
    <div class="myMain">
      <div id="top">관리자 페이지</div>

      <div className="user">
        <div id="profile">
          <p>환영합니다.</p>
          <ul>
            <li>
              <a href="">주문관리</a>
            </li>
            <li>
              <a href="/admin_user_list">회원관리</a>
            </li>
            <li>
              <a href="">카테고리 추가</a>
            </li>
            <li>
              <a href="">상품 추가</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
