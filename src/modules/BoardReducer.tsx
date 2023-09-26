// Action Type
const SET_TITLE = 'SET_TITLE';
const SET_MEMBER = 'SET_MEMBER';

//Action Create Function
export const setTitle = (e: any) => ({
    type: SET_TITLE,
    selected: '제목',
    search_type: 'title'
});

export const setMember = (e: any) => ({
    type:  SET_MEMBER,
    selected: '작성자',
    search_type: 'member_id'
});

//initalState
const initalState = {
    selected: '제목',
    search_type: 'title'
};

// Reducer
const boardReducer = (state = initalState, action: any) => {
    switch(action.type) {
        case SET_TITLE:
            return { 
                selected: action.selected,
                search_type: action.search_type 
            };
        case SET_MEMBER:
            return { 
                selected : action.selected,
                search_type: action.search_type 
            };
        default:
            return { 
                ...state,
                selected: state.selected,
                search_type: state.search_type 
            }
    }
}

export default boardReducer;