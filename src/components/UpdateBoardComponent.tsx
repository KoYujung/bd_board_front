import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';

export default function UpdateBoardComponent() {
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
    });

    const { no } = useParams();
    const navigate = useNavigate();

    const changeTitle = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, title: event.target.value });
    };

    const changeContents = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, contents: event.target.value });
    };

    const changeMemberId = (event : React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, member_id: event.target.value });
    };

    const updateBoard = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let new_board = {
            title: data.title,
            contents: data.contents,
            member_id: data.member_id,
        };
        console.log("new_board", JSON.stringify(new_board));
        BoardService.updateBoard(no, new_board)
            .then(() => {
                navigate('/board');
            });
    };

    useEffect(() => {
        BoardService.getOneBoard(no)
            .then((res) => {
                console.log(res);
                setData({
                    title: res.title,
                    contents: res.contents,
                    member_id: res.member_id,
                });
            })
            .catch((error) => {
                console.error("Error fetching board data:", error);
            });
    }, [no]);

    return (
        <div>
            <h2>글 수정</h2>
            <form>
                <div>
                    <label>제목</label>
                    <input type='text' placeholder='제목을 입력해주세요' value={data.title} onChange={changeTitle}></input>
                </div>
                <div>
                    <label>내용</label>
                    <textarea placeholder='내용을 입력해주세요' value={data.contents} onChange={changeContents}></textarea>
                </div>
                <div>
                    <label>작성자 번호</label>
                    <input value={data.member_id} onChange={changeMemberId}></input>
                </div>
            </form>
            <div className='row'>
                <button onClick={updateBoard}>저장</button>
                <button onClick={() => navigate(-1)}>취소</button>
            </div>
        </div>
    )
}
