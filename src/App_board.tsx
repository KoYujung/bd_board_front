import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import UpdateBoardComponent from './components/UpdateBoardComponent';
import { Footer } from 'antd/es/layout/layout';
import BoardHeaderComponent from './components/BoardHeaderComponent';

export default function App_board() {
  return (
    <div>
    <BoardHeaderComponent />
    <div className='board_content'>
    <Routes>
      <Route path='/' element={<ListBoardComponent />} />
      <Route path='/board' element={<ListBoardComponent />} />
      <Route path='/create_board' element={<CreateBoardComponent />} />
      <Route path='/update_board/:no' element={<UpdateBoardComponent />} />
      <Route path='/read_board/:no' element={<ReadBoardComponent />} />
    </Routes>
    </div>
    <Footer>©2023 Created by yuu</Footer>
    </div>    
  )
}