import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
}); // 컬렉션에 데이터가 들어 갈 구조

export const Board = mongoose.model("Board", BoardSchema);
// 컬렉션
