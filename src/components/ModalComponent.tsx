import { Button, Modal } from 'antd'
import { useState } from 'react'
import BoardService from '../service/BoardService';

interface Props {
    prevNo: number,
    nextNo: number
}

export default function ModalComponent(props: Props) {
    
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
        showModal(props.prevNo);
    };
    const nextModal = () => {
        showModal(props.nextNo);
    };
    const showModal = (No: number) => {
        BoardService.getOneBoard(No)
        .then((data) => {
            setNewData(data);
            setIsModalOpen(true);
        })
        .catch((error) => {
            alert("글이 존재하지 않습니다.");
        })
    };

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