import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { error } from 'console';

interface Props {
    prevNo: number,
    nextNo: number
}

export default function ModalComponent(props: Props) {

    // console.log("이전 게시글 번호 : " + props.prevNo + "\n 다음 게시글 번호 : " + props.nextNo );
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newData, setNewData] = useState({
        title: '',
        contents: ''
    });

    const handleOk = () => {
        setIsModalOpen(false);       
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const prevModal = () => {
        BoardService.getOneBoard(props.prevNo)
        .then((data) => {
            setNewData(data);
            console.log("이전 글 제목 : "  + data.title);
            setIsModalOpen(true);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const nextModal = () => {
        BoardService.getOneBoard(props.nextNo)
        .then((data) => {
            setNewData(data);
            console.log("다음 글 제목 : "  + data.title);
            setIsModalOpen(true);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <>
        <Button className='MarginButton' type='primary' onClick={prevModal}>이전 글</Button>
        <Button className='MarginButton' type='primary' onClick={nextModal}>다음 글</Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h2>{newData.title}</h2>
            <p>{newData.contents}</p>
        </Modal>
        </>
    )
}