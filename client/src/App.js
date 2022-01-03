import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './page/main/main';
import Study from "./page/study/study";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={"/"} element={<Main/>}/>
        <Route exact path={"/main"} element={<Main/>}/>
        <Route exact path={"/study"} element={<Study/>}/>
      </Routes>
    </Router>
  );
};

export default App;
