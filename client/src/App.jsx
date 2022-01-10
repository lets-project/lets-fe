import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './page/main/main';
import Study from "./page/study/study";
import MyLikes from "./page/my_likes/myLikes";
import MyPosts from "./page/my_posts/myPosts";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Main/>}/>
        <Route path={"/main"} element={<Main/>}/>
        <Route path={"/study/*"} element={<Study/>}/>
        <Route path={"/myLikes"} element={<MyLikes/>}/>
        <Route path={"/myPosts"} element={<MyPosts/>}/>
      </Routes>
    </Router>
  );
};

export default App;
