// type 추정
let aaa = "안녕하세요";
aaa = "안녕";

// type 명시,
let bbb: String = "안녕안녕";
bbb = 10;

// type 명시가 필요한 상황
let ccc: String | number = "반갑";
ccc = 10;

// 숫자타입
let ddd: number = 10;
ddd = "철수";

// 불린타입
let eee: boolean = true;
eee = false; // 조건문에 들어가면 f
eee = "false"; // 조건문에 들어가면 t

// 0 : f, 아닌 모든 값 : t
// t : 숫자 0 이 아닌 모든 값, 비어있지 않은 문자열 (" " 공백)
// f : 숫자 0, 빈문자열 ""/''

// 배열타입
let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
let ggg: string[] = ["a", "b", "c", 3];
let hhh: (string | number)[] = [1, 2, 3, 4, 5, "안녕하세요"];

// 객체타입
interface IProfile {
  // interface : 객체타입을 지정하기 위한
  name: string;
  age: number | string;
  school: string;
  hobby?: string; // ? 있어도 되고 없어도 됨
}
let profile: IProfile = {
  name: "철수",
  age: 8,
  school: "람쥐",
};
profile.age = "8살";
profile.hobby = "수영";

// 함수타입                                             return type

const add1 = (m1, m2, u) => {
  return m1 + m2 + u;
};
const result1 = add1(1000, 2000, "원");
// return1 type = any (: 자바스크립트, 함수에서 받는 parameter는 기본적으로 any)
// 따라서 아래와 같이 지정해주어야 함 ( ! 주의 ! )

const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};
const result = add(1000, 2000, "원");
