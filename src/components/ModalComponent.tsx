/* eslint-disable no-self-assign */
import { Button, Modal } from 'antd'
import { useState } from 'react'
import BoardService from '../service/BoardService';

interface Props {
    currentNo: number
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
        // checkYN(props.currentNo - 1);
        PrecheckYN(props.currentNo - 1);
    };
    const nextModal = () => {
        // checkYN(props.currentNo + 1);
        NextcheckYN(props.currentNo + 1);
    };

    // const checkYN = (num: any) => {
    //     BoardService.getOneBoard(num)
    //     .then(data => {
    //         console.log(data);
    //         data.useYN === 'Y' ? num = num : checkYN(num - 1);
    //         setNewData(data);
    //         setIsModalOpen(true);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         alert("글이 존재하지 않습니다.");
    //     })
    // }
    
    const PrecheckYN = (num: any) => {
        BoardService.getOneBoard(num)
        .then(data => {
            console.log(data);
            data.useYN === 'Y' ? num = num : PrecheckYN(num - 1);
            setNewData(data);
            setIsModalOpen(true);
        })
        .catch((error) => {
            console.error(error);
            alert("글이 존재하지 않습니다.");
        })
    }
    const NextcheckYN = (num: any) => {
        BoardService.getOneBoard(num)
        .then(data => {
            console.log(data);
            data.useYN === 'Y' ? num = num : NextcheckYN(num + 1);
            setNewData(data);
            setIsModalOpen(true);
        })
        .catch((error) => {
            console.error(error);
            alert("글이 존재하지 않습니다.");
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

/*
useYN?
Y -> 해당 번호의 게시글 내용 가져오기
N -> 이전/다음 게시글 내용 가져오기 

*/