import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
// 임포트해서 가져오기
import data from "./data.js";
// 라우팅 관련 임포트
import { Routes, Route, Link } from "react-router-dom";

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      {/* 라우팅 이동 사용법 */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Detail">Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 라우팅 사용법 */}
      <Routes>
        <Route path="/" element={<MainComp shoes={shoes} />} />
        <Route path="/detail" element={<DetailComp />} />
      </Routes>
    </div>
  );
}

// 메인 화면 컴포넌트
function MainComp(props) {
  let shoes = props.shoes;
  return (
    <>
      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {shoes.map((item, index) => {
            return <ShoesComp shoes={shoes[index]} key={index}/>;
          })}
        </div>
      </div>
    </>
  );
}

// 신발 상품들 컴포넌트
// 무조건 컴포넌트 이름은 대문자로 시작해야된다!!
function ShoesComp(props) {
  let shoes = props.shoes;
  return (
    <>
      <div className="col-md-4">
        <img src={shoes.url} width="80%" alt={shoes.title} />
        <h4>{shoes.title}</h4>
        <p>{shoes.price} WON</p>
        <p>{shoes.content}</p>
      </div>
    </>
  );
}

// 상세 화면 컴포넌트
function DetailComp(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">상품명</h4>
            <p>상품설명</p>
            <p>120000원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
