export default function Header() {
  return (
    <div style={{ backgroundColor: "white", paddingBottom: 20 }}>
      <div style={{ padding: 30, backgroundColor: "gray", textAlign: 'center' }}>
        <a>배너</a>
      </div>

      <div style={{ display: "flex", backgroundColor: "#F0EBEB", height: 50 }}>
        <nav style={{ marginLeft: 'auto', marginRight: 50 }}>
          <ul>
            <li><a href="#" style={{fontSize : 15}}>회원가입</a></li>
            <li>|</li>
            <li><a href="#" style={{fontSize : 15}}>로그인</a></li>
            <li>|</li>
            <li><a href="#" style={{fontSize : 15}}>고객센터</a></li>
          </ul>
        </nav>
      </div>

      <div style={{display : "flex", marginTop : 50}}>
        <div style={{marginLeft : 'auto'}}>
        <img alt="logo" src="img/bookstory.png" width={"30%"} />
        <input
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
          style={{ backgroundColor: "white", width: '70%', height : 40, marginTop : '2%'}}
        />
        </div>
        <nav style={{marginLeft : 'auto'}}>
        <li>
          <button class="contrast" style={{ width: 60, marginRight: '50%', backgroundColor: "white" }}>
            <img alt="shoppin-cart" src="img/shopping-cart.svg" width={"100"} /></button>
        </li>
        <li>
          <button class="contrast" style={{ width: 60, marginRight: '10%', backgroundColor: "white" }}>
            <img alt="user" src="img/user.svg" width={"70"} /></button>
        </li>
        </nav>
      </div>

      <div style={{ display: "flex", marginTop : 80, justifyContent: 'center' }}>
        <nav>
          <button class="contrast" style={{ backgroundColor: "white" }}>
            <img alt="menu" src="img/menu.svg" width={"40"} /></button>
          <ul>
            <li style={{marginLeft : 50}}><a href="#">카테고리</a></li>
            <li style={{marginLeft : 50}}><a href="#">카테고리</a></li>
            <li style={{marginLeft : 50}}><a href="#">카테고리</a></li>
            <li style={{marginLeft : 50}}><a href="#">카테고리</a></li>
            <li style={{marginLeft : 50}}><a href="#">카테고리</a></li>
            <li style={{marginLeft : 50}}><a href="#">카테고리</a></li>
            <hr />
          </ul>
        </nav>
      </div>
    </div >
  );
}
