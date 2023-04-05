interface IProfile {
    name: string;
    age: number;
    school: string;
    // ? 필수사항 아님
    hobby?: string;
}
  
// type Aaa = {
//     name: string;
//     age: number;
//     school: string;
//     hobby?: string;
// };
// // type으로 지정한 타입은 같은 이름으로 재정의 x

//   // IProfile과 Aaa 타입의 차이는 선언병합에서 발생함

// interface IProfile {
// 	apple: number;
// }

// const bbb: IProfile = {

// }

// // 1 Partial 타입
// type MyType1 = Partial<IProfile>;

// // 2 Required 타입
// type MyType2 = Required<IProfile>;

// // 3 Pick 타입
// type MyType3 = Pick<IProfile, "name" | "age">;

// // 4 Omit 타입
// type MyType4 = Omit<IProfile, "school">;

// 5 Record 타입
type ZZZ = "aaa" | "qqq" | "rrr";
type MyType5 = Record<ZZZ, string>;