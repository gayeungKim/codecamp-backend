// . : 객체

// class Date {
//   getFullYear() {}
//   getMonth() {}
// }

const date = new Date();
//(인스턴스)객체      내장객체
// 객체지향프로그래밍-OOP

// console.log(date.getDate());

class Monster {
  power = 10;
  // 함수와 변수 정의가 가능

  constructor(power) {
    // 생성자
    this.power = power;
  } // power의 default는 10이지만 생성자를 통해 power 값을 외부로부터(인스턴스) 받아올 수 있음

  attack = () => {
    this.power; // 동일 객체 내 변수 사용
    this.run(); // 동일 객체 내 함수 사용
    console.log(this.power + " attack");
  };
  run = () => {
    this.power;
    console.log(this.power + " run");
  };
}

const mymon1 = new Monster(20);
//    인스턴스 (객체를 이용하여 인스턴스를 만듬)
mymon1.attack();
// const mymon2 = new Monster(30);
// mymon2.run();
