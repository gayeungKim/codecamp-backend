import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  name: String,
  date: Date,
  price: Number,
}); // 컬렉션에 데이터가 들어 갈 구조

export const Stock = mongoose.model("Stock", StockSchema);
// 컬렉션
