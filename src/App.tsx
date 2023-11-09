import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPosts from './components/UserPosts';


function App() {
  return (
    // <div>
    //   <UserList />
    // </div>

    <BrowserRouter>
    <Routes>
      <Route   path="/" element={<UserList />}/>
        <Route   path="/:id"  element={<UserPosts />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
