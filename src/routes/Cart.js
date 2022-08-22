import Table from 'react-bootstrap/Table'
// {} 안붙이면 에러남 이유는 모르겠음..
// redux로 수정하려면 useDispatch를 넣어주고 수정 함수를 호출해야됨
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import {changeName, changeCount} from './../store.js';
import { memo, useMemo, useState } from 'react';


// 이렇게 사용하고 Cart 컴포넌트에서 state를 변경하면 child도 같이 재랜더링됨
// 하지만 이게 오래걸리는 재랜더링 페이지라면 부하가 심하게됨
// function Child(){
//     console.log("재랜더링됨");
//     return <div>자식임</div>
// }

// 이렇게 처리하면 props가 변할때만 재랜더링을 해줌 == 잘쓰지는 않는다고 함
let Child = memo(function(){
    console.log("부모에서 props 보낼때만 재랜더링됨");
    return <div>자식임</div>
})

// 카트 컴포넌트
function Cart(){

    
    let user = useSelector((state => {
        // state.user 를 return하면 user만 가져올수잇음
        return state.user
    }));
    console.log(user);

    let [count, setCount] = useState(0);

    // useEffect랑 비슷하게 1번만 실행 시켜주는거고 [] 디펜던시를 넣어서 넣은 state가 변화될때 실행시키는
    // 원리까지 같음 차이점은 useEffect는 아래 return 부분 페이지 랜더링 후 실행되지만 useMemo는 랜더링 될때 실행된다는
    // 차이점이 있음 
    // let result = useMemo(()=>{ 
    //   // 여기서 함수 호출 
    // }, [])
    
    return(
        <div>
            {/* <Child></Child> */}
            {/* 부모에서 props 보낼때만 재랜더링됨 */}
            {/* <Child count={count}></Child> */}
            <button onClick={()=>{setCount(count++)}}>+</button>
            {/* {user} 의 장바구니 */}
           <CartItems/>
        </div>
    )
}

// 카트 아이템 컴포넌트
function CartItems(){

    // redux 수정함수 호출 방법
    let dispatch = useDispatch();

     // redux 사용법
     let item = useSelector((state => {
        // state.user 를 return하면 user만 가져올수잇음
        return state.item
    }));
    console.log(item);

    return(
        <Table>
        <thead>
            <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            </tr>
        </thead>
        <tbody>
            {
                item.map((item, index)=>{
                        return(
                            <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td><Button onClick={()=>{
                                // 수정 함수는 dispatch로 감싸서 호출
                                // dispatch(changeName());
                                dispatch(changeCount(item.id))
                            }}variant="primary">+</Button></td>
                            </tr>
                        )
                })
            }
        </tbody>
    </Table>
    )
}

export default Cart;