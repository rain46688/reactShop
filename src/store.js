import { configureStore, createSlice } from '@reduxjs/toolkit'

// 상단에서 각각 사용하고자하는 데이터를 만듬 name, initialState 이렇게 작성해야됨
let user = createSlice({
    name : 'user',
    initialState : 'kim',

    // state 수정 함수
    reducers : {
        changeName(state, i){ // state 기존 state
            console.log("state : ",state);
            return 'john '+state;// 이걸로 수정해줌
        }
    }
})

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let item = createSlice({
    name : 'item',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],

    reducers : {
        // 클릭하면 맞는 상품의 count가 증가하도록 만든것
        changeCount(state, num){
            // console.log("state : ",state[0].count);
            // console.log("num : ",num.payload);
            
            for(let i in state)
                if(state[i].id == num.payload)
                    state[i].count++;

            return state;
        }
    }
})


// 함수 내보내는 방법 이렇게 해야지만 다른곳에서 호출할 수 있음
export let {changeName} = user.actions;
export let {changeCount} = item.actions;

export default configureStore({
    // 여기서 등록해줘야됨
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    item : item.reducer,
  }
})