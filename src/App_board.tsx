import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import UpdateBoardComponent from './components/UpdateBoardComponent';
import { Footer } from 'antd/es/layout/layout';
import HeaderComponent from './components/HeaderComponent';
import MainComponent from './components/MainComponent';

export default function App_board() {
  return (
    <div>
    <HeaderComponent />
    <div className='board_content'>
    <Routes>
      <Route path='/' element={<MainComponent />} />
      <Route path='/board' element={<ListBoardComponent />} />
      <Route path='/search_board' element={<ListBoardComponent />} />
      <Route path='/create_board' element={<CreateBoardComponent />} />
      <Route path='/update_board/:no' element={<UpdateBoardComponent />} />
      <Route path='/read_board/:no' element={<ReadBoardComponent />} />
    </Routes>
    </div>
    <Footer>©2023 Created by yuu</Footer>
    </div>    
  )
}