// Action Type
export const GET_BOARD = 'GET_BOARD';
export const CREATE_BOARD = 'CREATE_BOARD';
export const READ_BOARD = 'READ_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

//Action Create Function
export const getBoard = (BoardData: any) => ({
    type: GET_BOARD,
    BoardData: {
        no: BoardData.no,
        title: BoardData.title,
        member_id: BoardData.member_id,
        selected: BoardData.selected,
        inputted: BoardData.inputted,
    }
});

export const createBoard = (BoardNo: any) => ({
    type: CREATE_BOARD,
    BoardNo
});

export const readBoard = (BoardNo: any) => ({
    type: READ_BOARD,
    BoardNo
});

export const updateBoard = (BoardNo: any) => ({
    type: UPDATE_BOARD,
    BoardNo
});


//initalState
const initalState = {
    boards: [
        
    ]
}

// Reducer
export default function BoardReducer(state = initalState, action: any) {
    switch(action.type) {
        case GET_BOARD:
        
        case CREATE_BOARD:

        case READ_BOARD:

        case UPDATE_BOARD:
    }
}