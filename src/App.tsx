import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login';
import NavBar from './components/navBar';
import CreatePost from './pages/create-post/CreatePost';

function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create_post' element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
