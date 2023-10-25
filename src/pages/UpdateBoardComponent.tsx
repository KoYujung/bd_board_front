import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function UpdateBoardComponent() {
    const [data, setData] = useState({
        title: '',
        contents: '',
        member_id: '',
        fid: '',
        fname: '',
        fpath: '',
        fileYN: '',
    });
    const [testFIleData, setTestFileData] = useState([]);
    const [ files, setFiles ] = useState<File[]>([]);
    const { no } = useParams();
    const navigate = useNavigate();
    const formData = new FormData();

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

        formData.append('title', data.title);
        formData.append('contents', data.contents);
        formData.append('member_id', data.member_id);
        formData.append('fid', data.fid);
        formData.append('fname', data.fname);
        formData.append('fpath', data.fpath);

        for(let i = 0; i < files.length; i ++) {
            formData.append(`files[${i}]`, files[i]);
        }

        BoardService.updateBoard(Number(no), formData)
            .then(() => {
                navigate('/read_board/' + no);
            });
    };

    const uploadFile = (e: any) => {
        const selectedFiles = e.file;

        if(selectedFiles) {
            setFiles(selectedFiles);
        }
    };

    const deleteFile = (fid: String) => {
        BoardService.deleteFile(fid)
        .then(() =>{
            window.location.reload();
        })
    };

    useEffect(() => {
        BoardService.getOneBoard(Number(no))
            .then((res) => {
                setData({
                    title: res.title,
                    contents: res.contents,
                    member_id: res.member_id,
                    fid: res.fid,
                    fname: res.fname,
                    fpath: res.fpath,
                    fileYN: res.fileYN,
                });

            })
            .catch((error) => {
                console.error("Error fetching board data:", error);
            });
    }, [no]);

    console.log(files);
    // console.log(testFIleData);

    return (
        <>
        <h2 style={{textAlign: "center", marginTop: "3%"}}>기존 글을 수정합니다</h2>
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
                {/* <div className='create_div'>
                    <p className='label'>첨부파일</p>
                    <input type='file' multiple onChange={uploadFile} className='inputBoard' style={{display: 'inline'}}></input>
                    <div style={{marginTop: '10px'}}>
                        <p style={{display: 'inline', marginRight: '15px'}}>{data.fname}</p>
                        <a onClick={() => deleteFile(data.fid)} style={{color: 'red'}}>삭제</a>
                    </div>
                </div> */}
                <Form.Item
                label='첨부파일'
                >
                    <Upload.Dragger
                    fileList={testFIleData}
                    name='file'
                    multiple={true}
                    onChange={uploadFile}
                    />
                </Form.Item>
                
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

