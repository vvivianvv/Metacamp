const person = {
  name: "Kim",
  age: "31",
  birthday: "91/01/21",
  array: [1, 2, 3],
  func: function () {
    console.log("객체안의 함수");
  },
  ob: {
    name: "객체안의 객체",
  },
};
// console.log(person);
// console.log(person.name);
// console.log(person.age);
// console.log(person["birthday"]);
// console.log(person.array);
// console.log(person.array[0]);
// console.log(person.array[1]);
// console.log(person.array[2]);
// console.log("person func: ", person.func());
// console.log(person.ob.name);

person["data"] = 1;
person.data2 = 3;
person["data-3"] = 7;

console.log(person);
