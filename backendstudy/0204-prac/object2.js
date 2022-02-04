const dog = {
  name: "멍멍이",
  color: "하얀색",
  bark: function () {
    console.log("멍멍멍왈왈");
  },
};

// 구조분해할당
const { name, color, bark } = dog;

console.log(name);
console.log(color);
bark();

const { weight = "10kg" } = dog;

console.log(weight);
