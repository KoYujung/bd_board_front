import axios, { AxiosRequestConfig } from 'axios';

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
  async createBoard(board: object) {
    try {
      const res = await axios.post('/create_board', board);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //파일 업로드하기
  async createFile(files: any, bno: any) {
    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'multipart/form-data' }
    }; 
    try {
      const res = await axios.post('/create_file/' + bno, files, config);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //글 상세보기
  async getOneBoard(no : number, board?: any) {
    try {
      const res = await axios.get('/read_board/' + no, board);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //파일 불러오기
  async getFileByNo(no : number, files?: any) {
    try {
      const res = await axios.get('/read_file/' + no, files);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //파일 다운로드
  async downloadFile(fid : String) {
    try{
      const res = await axios.get('/download_file/' + fid);
      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }
  },

  //파일 삭제하기
  async deleteFile(fid : Array<String>) {
    try{
      const res = await axios.put('/delete_file/' + fid);
      return res;
    } catch(error) {
      console.error(error);
      throw(error);
    }
  },

  //글 수정하기
  async updateBoard(no: number, board: object) {
    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'multipart/form-data' }
    }; 
    
    try {
        const res = await axios.put('/update_board/' + no, board, config);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
  },

  //임시삭제 처리하기
  async changeUseYN(no: Array<number>) {
    console.log(no);
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
  async delComment(bno: number | undefined) {
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
  async registerMember(member: memberType) {
    try{
      const res = await axios.post('/register_member', member);
      return res.data;
    } catch(error){
      console.error(error);
      throw(error);
    }
  },

  //회원 목록 불러오기
  async getAllMembers() {
    try{
      const res = await axios.get('/get_member');
      return res;
    } catch(error) {
      console.error(error);
      throw(error);
    }
  }

};

export default BoardService;