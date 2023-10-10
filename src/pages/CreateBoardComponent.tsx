import React, { useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input } from 'antd';
import UpModalComponent from '../components/UpModalComponent';

interface Props {
    Update?: any
}

export default function CreateBoardComponent(props: Props) {

    console.log(props.Update);
    
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
            member_id : data.member_id,
        };
        if(new_board.title === '') {
            alert("제목을 입력해주세요");
        } else {
            BoardService.createBoard(new_board)
            .then(() => { navigate('/board') });
        }
    };

    return (
        <div style={{marginRight: '70%'}}>
            <UpModalComponent />
            <Form>
                <Form.Item className='create_div'>
                    <label>제목</label>
                    <Input type='text' placeholder='제목을 입력해주세요'  value={data.title} onChange={changeTitle} style={{marginTop: '7px'}}></Input>
                </Form.Item>
                <div className='create_div'>
                    <label className='label'>내용</label>
                    <TextArea placeholder='내용을 입력해주세요' value={data.contents} onChange={changeContents} style={{marginTop: '7px'}}></TextArea>
                </div>
                <div className='create_div'>
                    <label className='label'>작성자 번호</label>
                    <Input placeholder='작성자 번호를 입력해주세요' value={data.member_id} onChange={changeMemberId} style={{marginTop: '7px'}}></Input>
                </div>
            </Form>
            <Button className='MarginButton' type='primary' onClick={createBoard}>완료</Button>
            <Button className='MarginButton' onClick={() => {navigate(-1)}}>이전</Button>
        </div>
    );
}