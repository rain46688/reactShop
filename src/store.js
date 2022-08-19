import { configureStore, createSlice } from '@reduxjs/toolkit'

// 상단에서 각각 사용하고자하는 데이터를 만듬 name, initialState 이렇게 작성해야됨
let user = createSlice({
    name : 'user',
    initialState : 'kim'
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
      ]
})

export default configureStore({
    // 여기서 등록해줘야됨
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    item : item.reducer,
  }
})