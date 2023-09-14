import axios from 'axios';

const BoardService = {

  // 글 목록 불러오기
  async getBoards() {
    try {
      const res = await axios.get('/board');
      console.log("글 목록 조회 성공");
      return res.data;
    } catch(error) {
      console.error(error);
    }
  },

  //글 작성하기
  async createBoard(board : any) {
    try {
      const res = await axios.post('/create_board', board);
      return res.data;
    } catch (error) {
      console.log("create_board 호출 실패");
      console.error(error);
      throw error;
    }
  },

  //글 상세보기
  async getOneBoard(no : any) {
    try {
      const res = await axios.get('/read_board/' + no, no);
      return res.data;
    } catch(error) {
      console.log("read_board 호출 실패");
      console.error(error);
      throw error;
    }
  },

  //글 수정하기
  async updateBoard(no : any, board : any) {
    try {
      const res = await axios.put('/update_board/' + no, board);
      return res.data;
    } catch(error) {
      console.log("update_board 호출 실패");
      console.error(error);
      throw error;
    }
  },

  //글 삭제하기
  async deleteBoard(no : any) {
    try {
      const res = await axios.delete('/delete_board/' + no ,no);
      return res.data;

    } catch(error) {
      console.log("delete_board 호출 실패");
      console.error(error);
      throw error;
    }
  }
};

export default BoardService;
