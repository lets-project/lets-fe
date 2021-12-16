import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './page/main/main';
// const worldName = 'Choi';
// function HelloWorld(worldName){
//   return <h1> Hello, {worldName}!!</h1>
// }

const App = () => {
  console.log("TEST");
  return (
    <Router>
      <Routes>
        <Route exact path={"/"} element={<Main/>}/>
        <Route exact path={"/main"} element={<Main/>}/>
      </Routes>
    </Router>
//   <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//       {HelloWorld(worldName)}
//     </a>
//   </header>
// </div>
  );
};

export default App;
