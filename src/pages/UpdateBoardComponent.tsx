import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
        BoardService.updateBoard(Number(no), new_board)
            .then(() => {
                navigate('/read_board/' + no);
            });
    };

    useEffect(() => {
        BoardService.getOneBoard(Number(no))
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
        <>
        <h1 style={{textAlign: "center", marginTop: "3%"}}>기존 글을 수정합니다</h1>
        <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "3%"}}>
            <Form>
                <Form.Item className='create_div'>
                    <label>제목</label>
                    <Input type='text' placeholder='제목을 입력해주세요'  value={data.title} onInput={changeTitle} style={{marginTop: '7px'}}></Input>
                </Form.Item>
                <div className='create_div'>
                    <label className='label'>내용</label>
                    <TextArea placeholder='내용을 입력해주세요' value={data.contents} rows={4} onChange={changeContents} style={{marginTop: '7px'}}></TextArea>
                </div>
                <div className='create_div'>
                    <label className='label'>작성자 번호</label>
                    <Input placeholder='작성자 번호를 입력해주세요' value={data.member_id} onChange={changeMemberId} style={{marginTop: '7px'}}  prefix={<UserOutlined className="site-form-item-icon" />}></Input>
                </div>
            </Form>
            <Button className='MarginButton' onClick={updateBoard}>완료</Button>
            <Button className='MarginButton' danger onClick={() => navigate(-1)}>취소</Button>
        </div>
        </>
    )
}

