import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
// 임포트해서 가져오기
import data from "./data.js";
// 라우팅 관련 임포트
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
// 외부로 js 파일을 빼놓고 가져와서 라우팅을 진행할 수 있음
import DetailComp from "./routes/DetailComp.js";
// 404 이미지
import Image404 from '../src/img/404.png';

function App() {
  let [shoes] = useState(data);
  // 라우팅 도와주는 네비케이션 기능
  let navigate = useNavigate();

  return (
    <div className="App">
      {/* 라우팅 이동 사용법 
      이런식으로 사용하면 더 좋음 href 로하면 화면 깜빡여서 별로임*/}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 라우팅 사용법 */}
      <Routes>
        <Route path="/" element={<MainComp shoes={shoes} />} />
        <Route path="/detail" element={<DetailComp />} />
        {/*  nested routes 라는 문법임 /about/member 이런식으로 접속했을때 어떤 페이지로 갈지 정하는것임
        이건 그냥 넣는다고 보여지는건 아니고 about 컴포넌트에서 <Outlet></Outlet> 으로 소켓을 뚫어줘야됨 */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={ <div>멤버들</div> } />
          <Route path="location" element={ <div>회사위치</div> } />
        </Route>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={ <p>첫 주문시 양배추즙 서비스</p> } />
          <Route path="two" element={ <p>생일기념 쿠폰받기</p> } />
        </Route>
        <Route path="*" element={<><img src={Image404} width="40%" alt='404이미지'/></>} />
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


function About(){
  return (
    <div>
      <h4>about페이지임</h4>
      {/* nested routes 사용할때 /member /location에 관한 페이지를 어디에 보여줄지 Outlet을 이용해서 정함*/}
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;
