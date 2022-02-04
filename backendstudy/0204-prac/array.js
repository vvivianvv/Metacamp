// let A = new Array();
// console.log("배열 A: ", A);

// const B = [];
// console.log("배열 B: ", B);

let A = new Array("1", "2", "3", "4");
console.log("배열 A: ", A);

// const B = ["1", "2", "3", "4"];
// console.log("배열 B: ", B);

console.log(A[0]);
console.log(A[1]);
console.log(A[2]);
console.log(A[3]);

A.push("5");
console.log(A);

A.pop();
A.pop();
A.pop();
console.log(A);

A[0] = "7";
console.log(A);

const B = ["apple", "banana", "orange"];
const C = A.concat(B);
const D = B.concat(A);
console.log(C);
console.log(D);
