import { useParams } from "react-router-dom";
import data from "../data.js";

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