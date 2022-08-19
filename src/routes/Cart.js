import Table from 'react-bootstrap/Table'
// {} 안붙이면 에러남 이유는 모르겠음..
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';

// 카트 컴포넌트
function Cart(){

    return(
        <div>
           <CartItems/>
        </div>
    )
}

// 카트 아이템 컴포넌트
function CartItems(){

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
                            <td><Button variant="primary">변경하기</Button></td>
                            </tr>
                        )
                })
            }
        </tbody>
    </Table>
    )
}

export default Cart;