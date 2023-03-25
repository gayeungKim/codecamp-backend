export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "api project: api 명세서",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"], // api와 apiDocs를 개별 파일에 관리시 apiDocs 위치
};
