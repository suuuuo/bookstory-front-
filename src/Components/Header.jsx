export default function Header() {
  const Header = () => {
    return <header className="header"></header>;
  };
  return (
    <nav
      style={{
        padding: "20px",
        borderBottom: "1px solid black",
      }}
    >
      <ul>
        <li>
          <a href="/">
            <strong>엘리스 2팀 쇼핑몰</strong>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">핫딜</a>
        </li>
        <li>
          <a href="#">카테고리</a>
        </li>
        <li>
          <a href="/sign_in">로그인</a>
        </li>
        <li>
          <a href="/sign_up">회원가입</a>
        </li>
        <li>
          <a href="/Cart">장바구니</a>
        </li>
      </ul>
    </nav>
  );
}
