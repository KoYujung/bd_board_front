import { Button, Modal, message } from 'antd'
import { useState } from 'react'
import BoardService from '../service/BoardService';

interface Props {
    deleteNo: Object
}

export default function DeleteComponent(props: Props) {
    const [ModalOpen, setModalOpen] = useState(false);
    const [mes, setMes] = message.useMessage();

    const showModal = () => {
        if(Object.keys(props.deleteNo).length === 0) {
            mes.open({
                content: '삭제할 글을 선택해주세요',
                type: 'warning'
            });
            setModalOpen(false);
        } else setModalOpen(true);
    };
  
    const Ok = () => {
        BoardService.changeUseYN(Object([props.deleteNo]))
            .then(() => window.location.replace("/board"));
        setModalOpen(false);
    };
  
    const Cancel = () => {
        setModalOpen(false);
    };

    return (
        <>
        {setMes}
        <Button danger onClick={showModal}>글 삭제</Button>
        <Modal closable={false} open={ModalOpen} onOk={Ok} onCancel={Cancel} cancelText={"취소"} okText={"삭제"} okType='danger' >
            <h2 style={{textAlign: "center", marginBottom: "7%"}}>게시글을 삭제하시겠습니까? </h2>
        </Modal>
        </>
    )
}