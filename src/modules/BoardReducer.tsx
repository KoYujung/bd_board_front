// Action Type
const SET_TITLE = 'SET_TITLE';
const SET_MEMBER = 'SET_MEMBER';
const SET_CONTENT = 'SET_CONTENT';

//Action Create Function
export const setTitle = (e: string) => ({
    type: SET_TITLE,
    selected: '제목',
    search_type: 'title'
});

export const setMember = (e: string) => ({
    type:  SET_MEMBER,
    selected: '작성자',
    search_type: 'member_id'
});

export const setContent = (e: string) => ({
    type: SET_CONTENT,
    selected: '내용',
    search_type: 'content'
})

//initalState
const initalState = {
    selected: '제목',
    search_type: 'title'
};

interface actionType {
    type: string; 
    selected: string; 
    search_type: string;
}

// Reducer
const boardReducer = (state = initalState, action: actionType) => {

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
        case SET_CONTENT:
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