import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './page/main/main';
import Study from "./page/study/study";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Main/>}/>
        <Route path={"/main"} element={<Main/>}/>
        <Route path={"/study/*"} element={<Study/>}/>
      </Routes>
    </Router>
  );
};

export default App;
