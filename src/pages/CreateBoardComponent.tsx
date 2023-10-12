import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input, message } from 'antd';
import UpModalComponent from '../components/UpModalComponent';

export default function CreateBoardComponent() {

    const [newNo, setNewNo] = useState(0);   
    const [showNo, setShowNo] = useState(0);   
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
    });
    const [title, setTitle] = useState('새 글을 작성합니다.');
    const [mes, setMes] = message.useMessage();    
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

    const new_board = {
        title : data.title,
        contents : data.contents,
        member_id : data.member_id,
    };

    const createBoard = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(new_board.title === '') {
            mes.open({
                content: '제목을 입력해주세요',
                type: 'warning'
            });
        }  
        else if(newNo !== 0) {
            BoardService.updateBoard(newNo, new_board)
            .then(() => { navigate('/board') });
        }
        else {
            BoardService.createBoard(new_board)
            .then(() => { navigate('/board') });
        }
    };

    useEffect(() => {
        if(newNo !== 0) {
            BoardService.getOneBoard(newNo)
            .then((data) => {
                console.log(data);
                setData({
                    title: data.title,
                    contents: data.contents,
                    member_id: data.member_id,
                });
            })
            .catch((error) => {
                console.error("수정 글 가져오기 실패", error);
            });

            setTitle("기존 글을 수정합니다.");
        } else {
            setTitle('새 글을 작성합니다.');
            setData({
                title: '',
                contents: '',
                member_id: '',
            });
        }
    }, [newNo]);
    
    return (
        <>
        {setMes}
        <div style={{marginRight: '70%'}}>

        <h2>{title}</h2>
        
        <Form>
            <Form.Item className='create_div'>
                <label>제목</label>
                <Input type='text' placeholder='제목을 입력해주세요'  value={data.title} onInput={changeTitle} style={{marginTop: '7px'}}></Input>
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

        <UpModalComponent 
        newNo={newNo} setNewNo={setNewNo} showNo={showNo} setShowNo={setShowNo}
        />
        </div>
        </>
    );
}