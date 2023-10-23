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
        fname: '',
    });
    const [ files, setFiles ] = useState<File[]>([]);
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

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('contents', data.contents);
        formData.append('member_id', data.member_id);

        for(let i = 0; i < files.length; i ++) {
            formData.append(`files[${i}]`, files[i]);
        }

        // BoardService.updateBoard(Number(no), formData)
        //     .then(() => {
        //         navigate('/read_board/' + no);
        //     });
    };

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if(selectedFiles) {
            const uploadFiles = Array.from(selectedFiles);
            setFiles(uploadFiles);
        }
    };

    useEffect(() => {
        BoardService.getOneBoard(Number(no))
            .then((res) => {
                setData({
                    title: res.title,
                    contents: res.contents,
                    member_id: res.member_id,
                    fname: res.fname,
                });
            })
            .catch((error) => {
                console.error("Error fetching board data:", error);
            });
    }, [no]);

    return (
        <>
        <h1 style={{textAlign: "center", marginTop: "3%"}}>기존 글을 수정합니다</h1>
        <div style={{marginLeft: "15%", marginRight: "15%" }}>
            <Form>
                <Form.Item className='create_div'>
                    <p className='label'>제목</p>
                    <Input type='text' placeholder='제목을 입력해주세요'  value={data.title} onInput={changeTitle} className='inputBoard'></Input>
                </Form.Item>
                <div className='create_div'>
                    <p className='label'>내용</p>
                    <TextArea placeholder='내용을 입력해주세요' value={data.contents} rows={4} onChange={changeContents} className='inputBoard'></TextArea>
                </div>
                <div className='create_div'>
                    <p className='label'>첨부파일</p>
                    <input type='file' multiple value={String(data.fname)} onChange={uploadFile} className='inputBoard'></input>
                </div>
                <div className='create_div'>
                    <p className='label'>작성자 번호</p>
                    <Input placeholder='작성자 번호를 입력해주세요' value={data.member_id} onChange={changeMemberId} className='inputBoard'  prefix={<UserOutlined className="site-form-item-icon" />}></Input>
                </div>
            </Form>
            <Button className='MarginButton' onClick={updateBoard}>완료</Button>
            <Button className='MarginButton' danger onClick={() => navigate(-1)}>취소</Button>
        </div>
        </>
    )
}

