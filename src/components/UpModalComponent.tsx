import { Button, List, Modal, Radio, RadioChangeEvent } from 'antd'
import { useEffect, useState } from 'react'
import BoardService from '../service/BoardService';
import { SearchOutlined } from '@ant-design/icons';

interface boardType {
    no: number,
    title: string,
    contents: string,
}

interface Props {
    newNo: number,
    setNewNo: Function,
    showNo: number
    setShowNo: Function,
}

export default function UpModalComponent(props: Props) {
    const [ModalOpen, setModal] = useState(false);
    const [boards, setBoards] = useState<Array<boardType>>();
    const [value, setValue] = useState(0);

    const showModal = () => {
        setModal(true);
    };
    const Ok = () => {
        props.setNewNo(props.showNo);
        setModal(false);
    };
    const Cancel = () => {
        props.setNewNo(0);
        setModal(false);
    };

    useEffect(() => {
        BoardService.getBoards()
        .then((data) => {
            setBoards(data);
        })
        .catch((error) => {
            console.error(error);
        });
    },[]);

    const radioChange = (e: RadioChangeEvent) => {
        const updateNumber  = boards?.map(i => i.no)[e.target.value];
        setValue(e.target.value);
        props.setShowNo(updateNumber);
    }
    
    return (
        <>
        <Modal open={ModalOpen} onOk={Ok} onCancel={Cancel} cancelText={"취소"} okText={"선택"} width={700} closeIcon={false}>
            {/* 작성된 글 목록을 출력하고 하나의 글을 선택해서 수정 버튼 누르면 create_board 화면에 해당 글에 대한 데이터가 나올 수 있도록*/}

            <List 
            itemLayout="vertical"
            header={<h2>작성된 글 목록</h2>}
            bordered
            dataSource={boards}
            renderItem={(boards, index) => (
                <List.Item>
                    <Radio.Group onChange={radioChange} value={value}>
                        <Radio value={index}>제목 : {boards.title}</Radio>
                    </Radio.Group>
                </List.Item>
            )}
            />
        </Modal>

        <Button onClick={showModal} icon={<SearchOutlined />}>수정할 글 찾기</Button>
        </>
    )
}
