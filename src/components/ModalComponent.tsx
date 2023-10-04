/* eslint-disable no-self-assign */
import { Button, Form, Modal } from 'antd'
import { useState } from 'react'
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';

interface Props {
    currentNo: number
}

export default function ModalComponent(props: Props) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newData, setNewData] = useState({
        title: '',
        contents: ''
    });
    const [newNumber , setNewNum] = useState();
    const navigate = useNavigate();

    const handleOk = (num: any) => {
        setIsModalOpen(false);
        navigate('/read_board/' + newNumber);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const prevModal = () => {
        checkYN(props.currentNo, 'prev');
    };
    const nextModal = () => {
        checkYN(props.currentNo, 'next');
    };

    const checkYN = (num: any, direction: string) => {
        let newNum = direction === 'prev' ? num - 1 : num + 1;

        BoardService.getOneBoard(newNum)
        .then(data => {
            if(data.useYN === 'Y') {
                setNewData(data);
                setIsModalOpen(true);
                setNewNum(newNum);
            } else {
                checkYN(newNum, direction);
            }
        })
        .catch(() => {
            alert("글이 존재하지 않습니다");
        })
    }

    return (
        <>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h2>{newData.title}</h2>
            <p>{newData.contents}</p>
        </Modal>

        <Button className='MarginButton' type='primary' onClick={prevModal}>이전 글</Button>
        <Button className='MarginButton' type='primary' onClick={nextModal}>다음 글</Button>

        </>
    )
}