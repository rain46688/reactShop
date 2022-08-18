import { useParams } from "react-router-dom";
import data from "../data.js";
import styled from 'styled-components'

// 이런식으로 styled를 이용해서 버튼을 만들어서 컴포넌트 처럼 사용 가능
// 장점은 css 파일을 따로 만들지 않고 사용 가능하며 css에 props같은 react, js 문법을 넣을수있고 js 하나에 종속되서 로딩 개선
// 종속 문제는 App.css 파일을 App.module.css 이런식으로 js 파일명 뒤에.module 붙이면 css가 js에 종속되게 할수도있으니 편한걸 쓰자
// 단점은 코드가 복잡해지고 컴포넌트가 css인지 일반 컴포넌트인지 헷갈림
let YellowBtn = styled.button`
  background : ${ props => props.bg };
  color : black;
  padding : 10px;
`;

// 상세 화면 컴포넌트
function DetailComp(props) {

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
      <YellowBtn bg="orange">styled버튼</YellowBtn>
        <div className="container">
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
              <button className="btn btn-danger">주문하기</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default DetailComp;