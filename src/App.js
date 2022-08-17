import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
// 임포트해서 가져오기
import data from './data.js';

function App() {

  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>
      <div className="container">
        <div className="row">
         {
            shoes.map((item, index) => {
              return(
                <ShoesComp shoes={shoes[index]}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

// 무조건 컴포넌트 이름은 대문자로 시작해야된다!!
function ShoesComp(props){
  let shoes = props.shoes;
  return(
      <div className="col-md-4" key={shoes.id}>
        <img src={shoes.url} width="80%" alt={shoes.title}/>
        <h4>{shoes.title}</h4>
        <p>{shoes.price} WON</p>
        <p>{shoes.content}</p>
      </div>
  )
}

export default App;
