import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
    no: string;
    title: string;
    member_id: number;
    created_time: string;
}

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

    const createBoard = () => {
        navigate('/create_board');
    }

    const readBoard = (no: any) => {
        navigate(`/read_board/${no}`);
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
    
    return (
        <>
        <h2>게시판</h2>
        <Button type="primary" onClick={createBoard}>글 작성</Button>
        <Table columns={columns} dataSource={boards}/>
        </>
    )
}
