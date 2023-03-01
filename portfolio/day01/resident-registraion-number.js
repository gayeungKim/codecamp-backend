function customRegistraionNumber(rn) {
  //  console.log(rn);
  const isValid = errorOfResigstaionNumber();
  if (isValid) {
    custom(rn);
  }
}

function errorOfResigstaionNumber(rn) {
  const number = rn.split("-");

  if (number[0].length == 6) {
    if ((number[0] ^= [0 - 9])) {
      console.log("주민번호는 숫자로만 구성");
      return;
    } else if (number[1] != "-") {
      console.log("하이픈을 포함해서 입력");
      return;
    } else if (number[2].length != 7) {
      console.log("주민번호 뒷자리는 7자리");
      return;
    } else if ((number[2] ^= [0 - 9])) {
      console.log("주민번호는 숫자로만 구성");
      return;
    }
  } else {
    console.log("주민번호 앞자리는 6자리");
    return;
  }
}

//   if (rn[6] != "-") {
//     console.log("에러 발생!!! 형식이 올바르지 않습니다.");
//     return;
//   }
// } //001124-4******

// function custom(rn) {
//   for (i = 8; i < 13; i++) {
//     rn[i] == "*";
//   }

//   return rn;
// }

//customRegistraionNumber("주민번호");
errorOfResigstaionNumber("001124-7777777");
