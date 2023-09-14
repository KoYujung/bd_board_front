import React, { useEffect, useState } from 'react';
import BoardService from './service/BoardService';
import { useNavigate } from 'react-router-dom';
import "./index.css";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
    no: string;
    title: string;
    member_id: number;
    created_time: string;
  }
  
const columns: ColumnsType<DataType> = [
{
    title: "글 번호",
    dataIndex: "no",
    key: "no",
},
{
    title: "제목",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>
},
{
    title: "작성자",
    dataIndex: "member_id",
    key: "member_id"
},
{
    title: "작성일",
    dataIndex: "created_time",
    key: "created_time"
},
];  

export default function TableTest() {
    const [boards, setBoards] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        BoardService.getBoards()
            .then((data) => {
                setBoards(data);
                // console.log(data);
            })
            .catch((error) => {
                console.log("글 목록 api 호출 실패");
                console.error(error);
            });
    }, []);
    // console.log(boards);

    function createBoard() {
        navigate('/create_board');
    }

    function readBoard(no: any) {
        navigate(`/read_board/${no}`);
    }
    
  return (
    <>
    <h2>게시판</h2>
    <button onClick={createBoard}>글 작성</button>
    <Table columns={columns} dataSource={boards}/>
    </>
  )
}
