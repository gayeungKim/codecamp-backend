// interface: 선언 병합이 가능함
// 먼저 정의한 IProfile 타입
interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby?: string;
}
// // 후에 정의한 IProfile 타입
// interface IProfile {
//     address: string;
// }
// // 모두 병합되어 사용 가능
// const bbb: IProfile = {
//     //
// }

// // type은 선언 병합이 안됨!
// type Aaa {
//     name: string;
//     age: number;
//     school: string;
//     hobby?: string;
// }

// Utility 종류
// 1 Patial 타입
// 사전 정의한 타입이 모두 존재하지 않아도 됨
type MyType1 = Partial<IProfile>
// 2 Required 타입
// 사전에 정의한 타입이 모두 있어야 함 
type MyType2 = Required<IProfile>
// 3 Pick 타입
// 사전에 정의한 타입 중 고르기
type MyType3 = Pick<IProfile, "name" | "age">
// 4 Omit 타입
// 사전에 정의한 타입 중 빼기
type MyType4 = Omit<IProfile, "school">
// 5 Record 타입
// union type
type ZZZ = "aaa" | "qqq" | "rrr" // union type
type MyType5 = Record<ZZZ, string>

// 만약, union 타입을 만드려면?? => "name" | "age" | "hobby"

// const aaa: ZZZ;
// aaa ==="aaa";

// const qqq: keyof IProfile;
// qqq === "age";