class Monster {
  // 상속해줄 부모 class
  constructor(power) {
    // 생성자
    this.power = power;
  }

  attack = () => {
    this.power; // 동일 객체 내 변수 사용
    console.log(this.power + " attack");
  };
  run = () => {
    this.power;
    console.log(this.power + " fly");
  };
}

class SMonster extends Monster {
  // extends [] : 상속받겠다
  constructor(a) {
    // class는 상속을 받던 주던 모두 가지고 있음
    super(a); // 부모로 넘김
  }
  run = () => {
    console.log("배");
  };
}

class GMonster extends Monster {
  constructor(a) {
    super(a);
  }
  run = () => {
    console.log("고");
  };
}

const mymonster1 = new SMonster(10);
mymonster1.attack();

const mymonster2 = new GMonster(5);
mymonster2.run();
