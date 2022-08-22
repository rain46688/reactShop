import { useParams } from "react-router-dom";
import data from "../data.js";
import styled from 'styled-components'
import { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux'
import {addItem } from './../store.js';


// 상세 화면 컴포넌트
function DetailComp({copyShoes, shoes}) {

   // redux 수정함수 호출 방법
   let dispatch = useDispatch();

  // 랜더링 될때마다 실행됨
  // 하지만 log를 useEffect 밖으로 빼도 똑같이 실행된다 이건 html 뿌려진 이후에 실행하는것이라
  // 안에선 시간이 오래걸리는 디비 조회 같은 작업을 넣는게 좋음
  useEffect(()=>{
    // console.log("디테일");
    // 2초 후 배너 지우기
    setTimeout(()=>{
      setAlert(false);
    },2000);

    setTimeout(()=>{ setFade('end');},100)

    if(isNaN(Number(input))){
      // console.log("숫자 아님");
      setInput('');
    }

    return ()=>{
      // 클리너 함수 useEffect 하기 전에 실행되는거
      // 처음에 실행될때는 위에 log가 먼저 실행되지만 [] 지우고 버튼으로 state 변경해서 페이지 업데이트하면 클리너 함수가 먼저 실행되고 뒤에
      // 디테일이 log가 실행됨
      // console.log("클리너 함수");
      clearTimeout();
    }
  })
  //   }, [])

  // [] 넣는 이유는 페이지가 업데이트 될때는 실행안되게 하려고 디펜던시를 넣는것
  // mount시 1회 코드 실행되게됨
  // 안에 state를 넣으면 그게 변경되면 실행되도록할 수 있음

  let [alert,setAlert] = useState(true);
  let [input,setInput] = useState('');
  let [tab, setTab] = useState(0);
  // 본문 애니메이션 state
  let [fade, setFade] = useState('');
  // url 파라미터 가져오기
  let {id} = useParams();
  // 파라미터 id 값이랑 비교해서 같은 요소를 하나 찾아서 그걸 상세 페이지에 뿌려줌
  let chooseShoes = copyShoes.find((e)=>{
    if(e.id == id){
      return true;
    }
  });

   // 예시에 신발 이미지가 404라 임의로 바꾼것
   for(let i in copyShoes){
    if(copyShoes[i].id == 7)
    copyShoes[i].url='https://cdn.vox-cdn.com/thumbor/D9YWCMaqQG_HwxeGdyFXoTzjzIw=/0x0:2000x1284/1520x1013/filters:focal(840x482:1160x802):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56473521/pizza_shoe12.0.jpg';
    else if(copyShoes[i].id == 8)
    copyShoes[i].url='https://media.gq.com/photos/610966c300629082f58db9b8/master/w_2000,h_1333,c_limit/Cariuma-Catiba-Pro-sneaker.jpg';
    else
    copyShoes[i].url = `https://codingapple1.github.io/shop/shoes${(copyShoes[i].id + 1)}.jpg`;
  }

  // 로컬 스토리지에 array 가져오기
  let array = JSON.parse(localStorage.getItem('watched'));
  let result = array.find(e => e === chooseShoes.id);

  // 없으면 봤던 상세 페이지의 제품을 배열에 넣기 중복 x
  if(result == undefined){
    console.log("없음");
    array.push(chooseShoes.id);
    localStorage.setItem('watched',JSON.stringify(array));
  }

    return (
      <>
        <div className={`container start ${fade}`}>
          {
            alert == true ?  
            <Alert variant="warning">
              <Alert.Heading>신규 알림! 2초 후 배너는 자동 종료됩니다.</Alert.Heading>
            </Alert> : null
          }

          <div ></div>
          <div className="row">
            <div className="col-md-6">
              <img
                src={chooseShoes.url}
                width="100%" alt={chooseShoes.title}
              />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{chooseShoes.title}</h4>
              <p>{chooseShoes.content}</p>
              <p>{chooseShoes.price} WON</p>
              {/* <input onChange={(e)=>{
                setInput(e.target.value);
              }} value={input}></input> */}
              <button onClick={()=>{
                dispatch(addItem(chooseShoes))
              }} className="btn btn-danger">주문하기</button>
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
        
        {/* 탭 컴포넌트 */}
        <TabContent tab={tab} shoes={shoes}/>

        </div>
      </>
    );
  }

  // {tab} 이렇게 파라미터에 넣으면 props 이런식으로 안가져와도 바로 사용 가능하다!
  function TabContent({tab, shoes}){

    // if문을 안써도 이렇게 할수도있음 하지만 코드가 길어지면 생각해봐야될지도?
    // return [ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab]

    // 탭 애니메이션 state
    let [fade, setFade] = useState('');

    // 탭을 누를때마다 본문 띄우는곳에 애니메이션을 주고싶을때
    // 탭 태그에 하나하나 click을 넣을수도있지만 [tab]로 tab state가 변경될때마다 useEffect에서 처리할수도있음
    useEffect(()=>{
      setTimeout(()=>{ setFade('end');},100)

      return()=>{
        clearTimeout();
        setFade('');
      }
    },[tab]);

    if(tab == 0){
      return <div className={`start ${fade}`}><div>내용0</div><h4>{shoes[0].title}</h4></div>
        }else if(tab == 1){
          return <div className={`start ${fade}`}><div>내용1</div></div>
        }else if(tab == 2){
          return <div className={`start ${fade}`}><div>내용2</div></div>
        }
  }

  export default DetailComp;