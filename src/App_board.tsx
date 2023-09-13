import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import UpdateBoardComponent from './components/UpdateBoardComponent';

export default function App_board() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ListBoardComponent />} />
        <Route path='/board' element={<ListBoardComponent />} />
        <Route path='/create_board' element={<CreateBoardComponent />} />
        <Route path='/update_board/:no' element={<UpdateBoardComponent />} />
        <Route path='/read_board/:no' element={<ReadBoardComponent />} />
      </Routes>
    </div>
  )
}