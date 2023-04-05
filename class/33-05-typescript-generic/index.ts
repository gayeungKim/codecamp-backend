// 7. generic 타입 - 응용 - 축약버전1
// prettier-ignore
function getGenericReverseT<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
    return [arg3, arg2, arg1];
  }
const result7 = getGenericReverseT("철수", "다람쥐초등학교", 8);

// 8. generic 타입 - 응용 - 축약버전2
// prettier-ignore
function getGenericReverseTUV<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
    return [arg3, arg2, arg1];
  }
const result8 = getGenericReverseTUV("철수", "다람쥐초등학교", 8);
// const result8 = getGenericReverseTUV<string, number, number>("철수", "다람쥐초등학교", 8);