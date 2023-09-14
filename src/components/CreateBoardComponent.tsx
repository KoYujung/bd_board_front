import React, { useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Button, Input } from 'antd';

export default function CreateBoardComponent() {
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
    });
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
    const createBoard = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let new_board = {
            title : data.title,
            contents : data.contents,
            member_id : data.member_id
        };
        console.log("new_board", JSON.stringify(new_board));
        BoardService.createBoard(new_board)
            .then(() => { navigate('/board') });
    };

    return (
        <div>
            <h2>글 작성</h2>
            <form>
                <div className='create_title'>
                    <label>제목</label>
                    <Input type='text' placeholder='제목을 입력해주세요' value={data.title} onChange={changeTitle}></Input>
                </div>
                <div className='create_contents'>
                    <label>내용</label>
                    <TextArea placeholder='내용을 입력해주세요' value={data.contents} onChange={changeContents}></TextArea>
                </div>
                <div className='create_memberId'>
                    <label>작성자 번호</label>
                    <Input value={data.member_id} onChange={changeMemberId}></Input>
                </div>
            </form>
            <Button type='primary' onClick={createBoard}>완료</Button>
            <Button onClick={() => {navigate(-1)}}>이전</Button>
        </div>
    );
}