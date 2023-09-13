import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';

export default function ListBoardComponent() {
    const [boards, setBoards] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        BoardService.getBoards()
            .then((data) => {
                setBoards(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function createBoard() {
        navigate('/create_board');
    }

    function readBoard(no: any) {
        navigate(`/read_board/${no}`);
    }

    return (
        <div>
            <h2 className='text-center'>게시판 목록</h2>
            <div className='row'>
                <button className='btn btn-primary' onClick={createBoard}>글 작성</button>
            </div>
            <div className='row'>
                <table className='table table-striped table-bordered' cellSpacing={10}>
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>타이틀</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {boards.map((board) => 
                        <tr key={board.no}>
                            <td>{board.no}</td>
                            <td onClick={() => readBoard(board.no)}>{board.title}</td>
                            <td>{board.member_id}</td>
                            <td>{board.created_time}</td>
                        </tr>
                        )} */}
                        <tr key={boards.no}>
                            <td>{boards.no}</td>
                            <td onClick={() => readBoard(boards.no)}>{boards.title}</td>
                            <td>{boards.member_id}</td>
                            <td>{boards.created_time}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
