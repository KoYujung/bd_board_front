import { Button, List, Modal, Popover, Radio, RadioChangeEvent } from 'antd'
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
    const radioChange = (e: RadioChangeEvent) => {
        const updateNumber  = boards?.map(i => i.no)[e.target.value];
        setValue(e.target.value);
        props.setShowNo(updateNumber);
    };

    // const radioChange = (boards: boardType, index: number) => {
    //     props.setNewNo(boards.no);
    //     props.setShowNo(boards.no);
    //     setValue(index);
    // };

    useEffect(() => {
        BoardService.getBoards()
        .then((data) => {
            setBoards(data);
        })
        .catch((error) => {
            console.error(error);
        });
    },[]);

    useEffect(() => {
        props.setShowNo(boards?.map(i => i.no)[value]); 
    });

    return (
        <>
        <Modal open={ModalOpen} onOk={Ok} onCancel={Cancel} cancelText={"취소"} okText={"선택"} width={700} closeIcon={false}>

            <List 
            itemLayout="vertical"
            header={<h2>작성된 글 목록</h2>}
            bordered
            dataSource={boards}
            renderItem={(boards, index) => (
                <List.Item >
                    <Radio.Group onChange={radioChange} value={value}  >
                    {/* <Radio.Group onChange={() => radioChange(boards,index)} value={value}  > */}
                        <Popover content={boards.contents} placement="right">
                            <Radio value={index}>제목 : {boards.title}</Radio>
                        </Popover>
                    </Radio.Group>
                </List.Item>
            )}
            pagination={{
                defaultPageSize: 7,
                defaultCurrent: 1,
            }}
            />
        </Modal>

        <Button onClick={showModal} icon={<SearchOutlined />}>수정할 글 찾기</Button>
        </>
    )
}
