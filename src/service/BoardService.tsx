import axios from 'axios';

interface BoardType {
  title: string,
  contents: string,
  member_id: string;
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
  async createBoard(board : object) {
    try {
      const res = await axios.post('/create_board', board);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //글 상세보기
  async getOneBoard(no : string | undefined) {
    try {
      const res = await axios.get('/read_board/' + no);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //글 수정하기
  async updateBoard(no : string | undefined, board : BoardType) {
    try {
      const res = await axios.put('/update_board/' + no, board);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //임시삭제 처리하기
  async changeUseYN(no: any) {
    try{
      const res = await axios.put('/change_UseYN', no);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //글 삭제하기
  async deleteBoard(no : Number) {
    try {
      const res = await axios.delete('/delete_board/' + no);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //글 검색하기
  async searchBoard(type: String, keyword: String) {
    try {
      const res = await axios.get('/search_board/' + type + '/' + keyword);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //댓글 작성하기
  async addComment(no: string | undefined, c_contents: string) {
    try {
      const res = await axios.post('/add_comment/' + no, { c_contents },
        {headers: {'Content-Type': 'application/json'}});
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //댓글 가져오기
  async getComment(bno: string | undefined) {
    // console.log(comment);
    try {
      const res = await axios.get('/get_comment/' + bno);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default BoardService;