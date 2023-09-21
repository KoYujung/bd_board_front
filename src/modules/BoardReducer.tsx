// Action Type
export const CREATE_BOARD = 'CREATE_BOARD';
export const LIST_BOARD = 'LIST_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

//Action Create Function
export const listBoard = (listData: any) => ({
    type: 'LIST_BOARD',
    listdata: {
        boardNo : listData.no,
        boardTitle : listData.title,
        boardMemberId : listData.member_id,
        boardCreatedTime : listData.created_time,
    }
});

const initalState = {

}

// Reducer
export default function BoardReducer(state=initalState, action: any) {

}