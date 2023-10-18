import axios from 'axios';

interface BoardType {
  title: string,
  contents: string,
  member_id: string;
}

interface memberType {
  uid: string,
  uname: string,
  upass: string
}

const BoardService = {

  // 글 목록 불러오기
  async getBoards() {
    try {
      const res = await axios.get('/board');
      return res.data;
    } catch(error) {
      console.error(error);
    }
  },

  //글 작성하기
  async createBoard(board : Object) {
    try {
      const res = await axios.post('/create_board', board);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //글 상세보기
  async getOneBoard(no : number) {
    try {
      const res = await axios.get('/read_board/' + no);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //글 수정하기
  async updateBoard(no : number, board : BoardType) {
    try {
      const res = await axios.put('/update_board/' + no, board);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //임시삭제 처리하기
  async changeUseYN(no: Object) {
    try{
      const res = await axios.put('/change_UseYN', no);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //글 삭제하기
  async deleteBoard(no : number) {
    try {
      const res = await axios.delete('/delete_board/' + no);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //글 검색하기
  async searchBoard(type: string, keyword: string) {
    try {
      const res = await axios.get('/search_board/' + type + '/' + keyword);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //댓글 작성하기
  async addComment(bno: number, comment: Object) {
    try {
      const res = await axios.post('/add_comment/' + bno, comment);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //댓글 가져오기
  async getComment(bno: number) {
    try {
      const res = await axios.get('/get_comment/' + bno);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //댓글 삭제처리하기
  async delComment(bno: any) {
    try{
      const res = await axios.put('/delete_comment/' + bno);
      return  res;
    } catch(error) {
      console.error(error);
    }
  },

  //댓글 수 가져오기
  async countComment(bno: number) {
    try{
      const res = await axios.get("/count_comment/" + bno);
      return res;
    } catch(error) {
      console.error(error);
      throw(error);
    }
  },

  //조회수 증가하기
  async addView(no: number) {
    try{
      const res = await axios.put('/add_view/'+ no);
      return res;
    } catch(error) {
      console.error(error);
      throw(error);
    }
  }, 

  //조회수 순으로 글 4개 가져오기
  async getTop4Board() {
    try{
      const res = await axios.get('/get_Top4Boards');
      return res;
    } catch(error) {
      console.error(error);
      throw(error);
    }
  },

  //회원가입하기
  async registerMember(member: memberType | undefined) {
    try{
      const res = await axios.post('/register_member', member);
      return res.data;
    } catch(error){
      console.error(error);
      throw(error);
    }
  }

};

export default BoardService;