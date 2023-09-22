import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ModalComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
        // navigate();        
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <>
        <Button className='MarginButton' type='primary' onClick={showModal}>이전 글</Button>
        <Button className='MarginButton' type='primary' onClick={showModal}>다음 글</Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p></p>
        </Modal>
        </>
    )
}

/*
- 현재 글 상세 페이지의 번호 알아야 함
- 모달 창에 들어갈 내용 : 제목 + 내용


*/