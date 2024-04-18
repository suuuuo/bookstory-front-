import "../css/MyPage.css";

export default function MyPage() {
  return (
    <div class="myMain">
      <div id="top">마이페이지</div>

      <div className="user">
        <div id="profile">
          <p>[]님, 환영합니다.</p>
          <ul>
            <li>
              <a href="/user_profile">회원정보</a>
            </li>
            <li>
              <a href="/myorders">주문내역</a>
            </li>
            <li>
              <a href="">문의내역</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
