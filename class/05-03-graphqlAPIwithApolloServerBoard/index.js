import { ApolloServer, gql } from "apollo-server";

const mytypeDefs = gql`
  # input: front -> back
  #  type:  back -> front

  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [BoardReturn]
    #: [back->front]
  }

  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
    # (넣는 데이터 타입): return 타입
    createBoard2(createBoardInput: CreateBoardInput): String
    # (: 원래는 없는 type, front -> back)
  }
`;

const myresolvers = {
  Query: {
    fetchBoards: () => {
      // 1. 테이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
      const result = [
        { number: 1, writer: "작성자1", title: "제목1", contents: "내용1" },
        { number: 2, writer: "작성자2", title: "제목2", contents: "내용2" },
        { number: 3, writer: "작성자3", title: "제목3", contents: "내용3" },
      ];

      createBoard({ writer: "짱구", title: "짱구제목", contents: "짱구내용" });
      // aaa

      // 2. 꺼내온 결과 응답 주기
      return result;
    },
  },
  Mutation: {
    createBoard: (_, args) => {
      //parent, args, context, info
      // 1. 데이터를 등록하는 로직 => DB에 접소개서 데이터 저장하기
      //args.writer; // 프론트에서 데이터를 요청했을 경우
      //parent.writer // aaa. api에서 api로 데이터 요청
      console.log(args);

      // 2. 저장결과 알려주기!
      return "게시물 등록 성공";
    },

    createBoard2: (_, args) => {
      //parent, args, context, info
      // 1. 데이터를 등록하는 로직 => DB에 접소개서 데이터 저장하기
      //args.writer; // 프론트에서 데이터를 요청했을 경우
      //parent.writer // aaa. api에서 api로 데이터 요청
      console.log(args);

      // 2. 저장결과 알려주기!
      return "게시물 등록 성공";
    },
  },
};

const server = new ApolloServer({
  typeDefs: mytypeDefs,
  resolvers: myresolvers,
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
