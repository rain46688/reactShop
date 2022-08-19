import { useParams } from "react-router-dom";
import data from "../data.js";
import styled from 'styled-components'
import { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

// 이런식으로 styled를 이용해서 버튼을 만들어서 컴포넌트 처럼 사용 가능
// 장점은 css 파일을 따로 만들지 않고 사용 가능하며 css에 props같은 react, js 문법을 넣을수있고 js 하나에 종속되서 로딩 개선
// 종속 문제는 App.css 파일을 App.module.css 이런식으로 js 파일명 뒤에.module 붙이면 css가 js에 종속되게 할수도있으니 편한걸 쓰자
// 단점은 코드가 복잡해지고 컴포넌트가 css인지 일반 컴포넌트인지 헷갈림
// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : black;
//   padding : 10px;
// `;

// 라이프 사이클
// mount : 페이지 장착
// update : 변경됨
// unmount : 제거됨

// 상세 화면 컴포넌트
function DetailComp(props) {

  // 랜더링 될때마다 실행됨
  // 하지만 log를 useEffect 밖으로 빼도 똑같이 실행된다 이건 html 뿌려진 이후에 실행하는것이라
  // 안에선 시간이 오래걸리는 디비 조회 같은 작업을 넣는게 좋음
  useEffect(()=>{
    // console.log("디테일");
    // 2초 후 배너 지우기
    setTimeout(()=>{
      setAlert(false);
    },2000);

    if(isNaN(Number(input))){
      // console.log("숫자 아님");
      setInput('');
    }

    return ()=>{
      // 클리너 함수 useEffect 하기 전에 실행되는거
      // 처음에 실행될때는 위에 log가 먼저 실행되지만 [] 지우고 버튼으로 state 변경해서 페이지 업데이트하면 클리너 함수가 먼저 실행되고 뒤에
      // 디테일이 log가 실행됨
      // console.log("클리너 함수");
    }
  })
  //   }, [])

  // [] 넣는 이유는 페이지가 업데이트 될때는 실행안되게 하려고 디펜던시를 넣는것
  // mount시 1회 코드 실행되게됨

  // let [count, setCount] = useState(0);
  let [alert,setAlert] = useState(true);
  let [input,setInput] = useState('');
  let [tab, setTab] = useState(0);

  // url 파라미터 가져오기
  let {id} = useParams();
  // 파라미터 id 값이랑 비교해서 같은 요소를 하나 찾아서 그걸 상세 페이지에 뿌려줌
  let chooseShoes = data.find((e)=>{
    if(e.id == id){
      return true;
    }
  });

    return (
      <>
      {/* <YellowBtn bg="orange">styled버튼</YellowBtn> */}
        <div className="container">
          {
            alert == true ?  
            <Alert variant="warning">
              <Alert.Heading>신규 알림! 2초 후 배너는 자동 종료됩니다.</Alert.Heading>
            </Alert> : null
          }

          {/* {count}
          <button onClick={()=>{setCount(count+1)}}>버튼</button> */}

          <div ></div>
          <div className="row">
            <div className="col-md-6">
              <img
                src={`https://codingapple1.github.io/shop/shoes${(chooseShoes.id + 1)}.jpg`}
                width="100%" alt={chooseShoes.title}
              />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{chooseShoes.title}</h4>
              <p>{chooseShoes.content}</p>
              <p>{chooseShoes.price} WON</p>
              <input onChange={(e)=>{
                setInput(e.target.value);
              }} value={input}></input>
              <button className="btn btn-danger">주문하기</button>
            </div>
          </div>


{/* 탭 컨텐츠 추가 */}
          <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={()=>{
                setTab(0)
              }}eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{
                setTab(1)
              }}eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={()=>{
                setTab(2)
              }}eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        
        {/* 탭 컨텐츠! */}
        <TabContent tab={tab}/>
        

        </div>
      </>
    );
  }

  // {tab} 이렇게 파라미터에 넣으면 props 이런식으로 안가져와도 바로 사용 가능하다!
  function TabContent({tab}){

    // if문을 안써도 이렇게 할수도있음 하지만 코드가 길어지면 생각해봐야될지도?
    // return [ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab]

    if(tab == 0){
      return <div>내용0</div>
        }else if(tab == 1){
          return <div>내용1</div>
        }else if(tab == 2){
          return <div>내용2</div>
        }
  }
        


  export default DetailComp;