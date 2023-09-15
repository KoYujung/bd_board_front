import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';
import TextArea from 'antd/es/input/TextArea';
import { Button, Input } from 'antd';

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
                navigate('/read_board/' + no);
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
                    <Input type='text' placeholder='제목을 입력해주세요' value={data.title} onChange={changeTitle}></Input>
                </div>
                <div>
                    <label>내용</label>
                    <TextArea placeholder='내용을 입력해주세요' value={data.contents} onChange={changeContents}></TextArea>
                </div>
                <div>
                    <label>작성자 번호</label>
                    <Input value={data.member_id} onChange={changeMemberId}></Input>
                </div>
            </form>
            <div className='row'>
                <Button className='MarginButton' onClick={updateBoard}>저장</Button>
                <Button className='MarginButton' danger onClick={() => navigate(-1)}>취소</Button>
            </div>
        </div>
    )
}

