import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { ColumnType } from 'antd/es/table';

interface DataType {
  no: string;
  title: string;
  member_id: number;
  created_time: string;
}

export default function ListBoardComponent() {
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

    // const columns: ColumnType<DataType> = [

    // ]

    return (
        <>
        <h2>게시판 목록</h2>
        <div>
            <button onClick={createBoard}>글 작성</button>
        </div>

        {/* <Table columns={columns} data={boards}/> */}

            {/* <table cellSpacing={10}>
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>타이틀</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board : any) => 
                    <tr key={board.no}>
                        <td>{board.no}</td>
                        <td onClick={() => readBoard(board.no)}>{board.title}</td>
                        <td>{board.member_id}</td>
                        <td>{board.created_time}</td>
                    </tr>
                    )}
                </tbody>
            </table> */}
        </>
    );
}