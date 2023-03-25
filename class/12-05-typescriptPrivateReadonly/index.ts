// 1. public
class Aaa {
  // class
  constructor(public mypower) {
    // this.mypower=mypower
    // public : 어디서든 접근 가능
    // private : class 내부에서만 변경 가능
    // readonly : 변경 x
    // public, private, readonly 중 1개만 포함되면 자동실행
  }

  ggg() {
    // 함수, 메소드
    console.log(this.mypower);
  }
}
const aaa = new Aaa(50); // 인스턴스(객체) 생성
aaa.mypower = 5; // mypower를 public으로 받아왔기 때문에 밖에서도 가능

// 2. private
class Bbb {
  constructor(private mypower) {
    // this.mypower = mypower;
  }

  ggg() {
    console.log(this.mypower);
  }
}
const bbb = new Bbb(50);
bbb.mypower = 5; // mypwer를 private으로 받아왔기 때문에 밖에서 변경 불가능

// 3. readonly
class Ccc {
  constructor(readonly mypower) {
    // this.mypower = mypower;
  }
  ggg() {
    console.log(this.mypower);
    this.mypower = 10; // readonly는 읽기만 가능함. 따라서 안, 밖 모두 변경 불가능
  }
}
