import { Button, Modal } from 'antd'
import React, { useState } from 'react'

interface Props {
    title: string,
    contents: string,
}

export default function ModalComponent(props: Props) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);       
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    
    return (
        <>
        <Button className='MarginButton' type='primary' onClick={showModal}>이전 글</Button>
        <Button className='MarginButton' type='primary' onClick={showModal}>다음 글</Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h2>{props.title}</h2>
            <p>{props.contents}</p>
        </Modal>
        </>
    )
}