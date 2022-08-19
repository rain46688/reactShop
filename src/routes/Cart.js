import Table from 'react-bootstrap/Table'
// {} 안붙이면 에러남 이유는 모르겠음..
// redux로 수정하려면 useDispatch를 넣어주고 수정 함수를 호출해야됨
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import {changeName, changeCount} from './../store.js';


// 카트 컴포넌트
function Cart(){

    let user = useSelector((state => {
        // state.user 를 return하면 user만 가져올수잇음
        return state.user
    }));
    console.log(user);

    return(
        <div>
            {user} 의 장바구니
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