import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input, message } from 'antd';
import UpModalComponent from '../components/UpModalComponent';
import { UserOutlined } from '@ant-design/icons';

export default function CreateBoardComponent() {

    const [newNo, setNewNo] = useState(0);   
    const [showNo, setShowNo] = useState(0);   
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
    });
    const [ files, setFiles ] = useState<File[]>([]);

    const [title, setTitle] = useState('새 글을 작성합니다');
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
        else if(new_board.contents === '') {
            mes.open({
                content: '내용을 입력해주세요',
                type: 'warning'
            });
        }
        else if(new_board.member_id === '') {
            mes.open({
                content: '작성자 번호를 입력해주세요',
                type: 'warning'
            });
        }
        else {
            const formData = new FormData();

            formData.append('title', data.title);
            formData.append('contents', data.contents);
            formData.append('member_id', data.member_id);

            for(let i = 0; i < files.length; i ++) {
                formData.append(`files[${i}]`, files[i]);
            }
            
            if (newNo !== 0) {
                formData.append('newNo', newNo.toString());
                BoardService.updateBoard(newNo, formData)
                    .then(() => { navigate('/board') });
            } else {
                BoardService.createBoard(formData)
                    .then(() => { navigate('/board') });
            }
        }
    };

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if(selectedFiles) {
            const uploadFiles = Array.from(selectedFiles);
            setFiles(uploadFiles);
        }
    };

    useEffect(() => {
        if(newNo !== 0) {
            BoardService.getOneBoard(newNo)
            .then((data) => {
                setData({
                    title: data.title,
                    contents: data.contents,
                    member_id: data.member_id,
                });
            })
            .catch((error) => {
                console.error("수정 글 가져오기 실패", error);
            });
            setTitle("기존 글을 수정합니다");
        } else {
            setTitle('새 글을 작성합니다');
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
        <h1 style={{textAlign: "center", marginTop: "3%"}}>{title}</h1>
        <div style={{marginLeft: "15%", marginRight: "15%"}}>
            <Form action='/create_board' method='post' encType='multipart/form-data'>
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
                    <input type='file' multiple onChange={uploadFile} className='inputBoard'></input>
                </div>
                <div className='create_div'>
                    <p className='label'>작성자 번호</p>
                    <Input placeholder='작성자 번호를 입력해주세요' value={data.member_id} onChange={changeMemberId} className='inputBoard' prefix={<UserOutlined className="site-form-item-icon" />}></Input>
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