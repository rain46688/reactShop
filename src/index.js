import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 라우팅 관련 도와주는 라이브러리, npm install react-router-dom@6
import { BrowserRouter } from 'react-router-dom';
// redux 사용하는법 store 만든거랑 둘다 import, npm install @reduxjs/toolkit react-redux
import { Provider } from 'react-redux';
import store from './store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // </React.StrictMode> 이거 지우면 콘솔창에 log 두번 찍히는거 사라진다함 디버깅용으로 Mode 지정한것인듯
  //<React.StrictMode>
      <Provider store={store}>
        {/* redux를 사용하려면 <Provider>로 여기를 감싸줘야됨 */}
        <BrowserRouter>
          {/* 라우팅 관련되서 사용하려면 App을 <BrowserRouter>로 감싸줘야됨  */}
          <App />
        </BrowserRouter>
      </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
