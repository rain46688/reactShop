import "./App.css";
// bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
// useState
import { lazy, useEffect, useState } from "react";
// 임포트해서 가져오기
import data from "./data.js";
// 라우팅 관련 임포트
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
// 외부로 js 파일을 빼놓고 가져와서 라우팅을 진행할 수 있음
// import DetailComp from "./routes/DetailComp.js";
// import Cart from "./routes/Cart.js";

// 404 이미지
import Image404 from '../src/img/404.png';
// 비동기 라이브러리
import axios from "axios";

// 리액트 쿼리 라이브러리 사용하기, npm install @tanstack/react-query
import { useQuery } from '@tanstack/react-query'//1번

// lazy라고 표시하면 필요해질때 임포트를 해오는 기능임
const DetailComp = lazy( () => import('./routes/DetailComp.js') )
const Cart = lazy( () => import('./routes/Cart.js') )

// App 컴포넌트
function App() {
  let [shoes,setShoes] = useState(data);
  // 라우팅 도와주는 네비케이션 기능
  let navigate = useNavigate();
  let [copyShoes, setCopyShoes] = useState(shoes);

  useEffect(()=>{
    console.log("App 처음 실행했을때");
    // 상세 페이지 클릭했을때 본 내역을 로컬 스토리지에 저장하기 위해 App 처음 실행시 array를 넣어줌
    localStorage.setItem('watched',JSON.stringify([]));
  },[]);

  // 리액트 쿼리 사용해서 가져오기
  // 장점 : 성공/실패/로딩중 쉽게 파악 가능
  // 주기적으로 자동 데이터 갱신해줌
  // 두번 요청하는건 알아서 하나만 요청해줌
  //  요청 내역 캐시 보관해두고 이전 요청 먼저 보여주고 새로 요청함
  let result = useQuery(['user'], ()=>
  axios.get('https://codingapple1.github.io/userdata.json')
  .then((a)=>{ 
    console.log("a : ",a);
    return a.data 
  })
)

  // 로컬 스토리지 사용법
  // let obj = {name : 'kim'};
  // localStorage.setItem('data',JSON.stringify(obj));
  // let 꺼낸거 = localStorage.getItem('data');
  // console.log("JSON : ",JSON.parse(꺼낸거).name);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={{cursor:'pointer'}} onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>

          <Nav className="ms-auto">반가워요 {result.data != undefined ? result.data.name : ''}</Nav>
        </Container>
      </Navbar>

      {/* 라우팅 사용법 */}
      <Routes>
        <Route path="/" element={<MainComp setShoes={setShoes} shoes={shoes} copyShoes={copyShoes} setCopyShoes={setCopyShoes}/>} />
        <Route path="/detail/:id" element={<DetailComp shoes={shoes} copyShoes={copyShoes}/>} />
        <Route path="/cart" element={<Cart shoes={shoes} copyShoes={copyShoes}/>} />
        <Route path="*" element={<><img src={Image404} width="40%" alt='404이미지'/></>} />
      </Routes>
    </div>
  );
}

// 메인 화면 컴포넌트
function MainComp({shoes, setShoes, copyShoes, setCopyShoes}) {

  // 예시에 신발 이미지가 404라 임의로 바꾼것
  for(let i in shoes){
    if(shoes[i].id == 7)
      shoes[i].url='https://cdn.vox-cdn.com/thumbor/D9YWCMaqQG_HwxeGdyFXoTzjzIw=/0x0:2000x1284/1520x1013/filters:focal(840x482:1160x802):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56473521/pizza_shoe12.0.jpg';
    else if(shoes[i].id == 8)
      shoes[i].url='https://media.gq.com/photos/610966c300629082f58db9b8/master/w_2000,h_1333,c_limit/Cariuma-Catiba-Pro-sneaker.jpg';
    else
    shoes[i].url = `https://codingapple1.github.io/shop/shoes${(shoes[i].id + 1)}.jpg`;
  }

  return (
    <>
      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
        <div className="sortButton">
          <Button variant="primary" onClick={()=>{
            console.log("정렬");
            let copy = [...copyShoes];
            copy.sort((a,b)=>{
              if(a.title > b.title){
                return 1;
              }
              if(a.title < b.title){
                return -1;
              }
              return 0;
            });
            setShoes(copy);
          }}>상품 정렬</Button>{' '}
        </div>
          {shoes.map((item, index) => {
            return <ShoesComp shoes={shoes[index]} index={index} key={index}/>;
          })}
        </div>

        {/* 더보기 보여줄깨 있으면 버튼 보여주고 없으면 버튼 없애기 (shoes.length/3) + 1 이걸로 측정함 나중엔 바꿔야되긴함*/}
        {
          (shoes.length/3) + 1 != 4 ? <Button onClick={()=>{

            axios.get(`https://codingapple1.github.io/shop/data${(shoes.length/3) + 1}.json`)
            .then((result)=>{
              
              let array = copyShoes.concat(result.data);
              setShoes(array);
              setCopyShoes(array);
            })
            .catch((error)=>{
              console.log("에러 : ",error);
              console.log("더이상 상품이 없습니다.");
            })
          }}variant="primary">더보기</Button> : null
        }
        
      </div>
    </>
  );
}

// 신발 상품들 컴포넌트
// 무조건 컴포넌트 이름은 대문자로 시작해야된다!!
function ShoesComp({shoes, }) {
  // 라우팅 도와주는 네비케이션 기능
  let navigate = useNavigate();

  return (
    <>
      <div className="col-md-4">
        {/* style={{cursor:'pointer'}} 넣으면 마우스커서가 손모양으로 변경됨 */}
        <img src={shoes.url} width="80%" style={{cursor:'pointer'}} alt={shoes.title} onClick={()=>{navigate(`/detail/${shoes.id}`)}}/>
        <h4>{shoes.title}</h4>
        <p>{shoes.price} WON</p>
        <p>{shoes.content}</p>
      </div>
    </>
  );
}

export default App;
