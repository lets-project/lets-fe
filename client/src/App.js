import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './page/main/main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={"/"} element={<Main/>}/>
        <Route exact path={"/main"} element={<Main/>}/>
      </Routes>
    </Router>
  );
};

export default App;
