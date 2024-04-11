import "./css/FooterContent.css";

const jh = "https://github.com/ji-jjang";
const jm = "";
const sm = "";
const hy = "https://github.com/haileyeong";
const yj = "";

function FooterContent() {
  return (
    <div className="main">
      <div className="title">
        <p>Project.Book-story</p>
      </div>
      <div className="member">
        <p>Member</p>
        <ul>
          <li>
            <a href={jh}>지준혁</a>
          </li>
          <li>
            <a href={jm}>박종민</a>
          </li>
          <li>
            <a href={sm}>윤수민</a>
          </li>
          <li>
            <a href={hy}>이하영</a>
          </li>
          <li>
            <a href={yj}>황예준</a>
          </li>
        </ul>
      </div>
      <div className="stack">
        <p>Stack</p>
        <ul>
          <li>Java</li>
          <li>Java</li>
          <li>Java</li>
          <li>Java</li>
          <li>Java</li>
          <li>Java</li>
          <li>Java</li>
        </ul>
      </div>
      <p>Copyright © Elice Team 2. 2024 All Rights Reserved.</p>
    </div>
  );
}

export default FooterContent;
