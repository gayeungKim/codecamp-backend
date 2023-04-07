// 함수 타입의 이해

// 1 문자 타입일 때
// (받아올 인자 정의):반환값 정의
function getString(arg: string): string{
    return arg;
}
// getString을 호출해 result1에 받음
const result1 = getString("철수")

// 2 숫자 타입일 때
// (받아올 인자 정의):반환값 정의
function getNumber(arg: number): string{
    return "확인";
}
// getString을 호출해 result1에 받음
const result2 = getNumber(8);

// 결과에 대한 타입을 예측할 수 있음!!

// 3 any 타입일 때
// (받아올 인자 정의):반환값 정의
function getAny(arg: any): any{
    return arg;
}
// getString을 호출해 result1에 받음
const result31 = getAny("철수");
const result32 = getAny(8);
const result33 = getAny(true);

// 4 generic (any) 타입일 때
// (받아올 인자 정의):반환값 정의

// 뭐든지 넣을 수 있다는 것은 any와 같음
// 결과를 예측할 수 있다는 것은 typeScript와 같음
function getGeneric<myType>(arg: myType): myType{
    return arg;
}
// getString을 호출해 result1에 받음
const result41 = getAny("철수");
const result42 = getAny(8);
const result43 = getAny(true);

// 5 any 타입
function getAnyReverse(arg1: any, arg2: any, arg3: any): [any, any, any] {
    return [arg3, arg2, arg1];
}
// getString을 호출해 result1에 받음
const result5 = getAnyReverse("철수", "다람쥐", 8);

// 6 generic 타입 => 응용
// 함수 선언 당시에는 어떤 인자가 들어올지 모름 -> any 특징
// 인자 전달에서 타입이 정해짐!
function getGenericReverse<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3):[MyType3, MyType2, MyType1] {
    return [arg3, arg2,arg1];
}
const result6 = getGenericReverse("철수", "다람쥐",  8);

// 7 generic 타입 => 응용 (축약!)
function getGenericReverseT<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
    return [arg3, arg2, arg1];
}
const result7 = getGenericReverseT("철수", "다람쥐", 8);

// 8 generic 타입 => 응용 (더 축약!)
function getGenericReverseTUV<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
    return [arg3, arg2, arg1];
}
const result81 = getGenericReverseTUV("철수", "다람쥐", 8); // 타입을 추론함
const result82 = getGenericReverseTUV<string, number, number>("철수", "다람쥐", 8); // 타입을 명시함