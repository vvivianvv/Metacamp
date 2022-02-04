const data = [1, 3, 5, 7, 9];

data.forEach((item, index) => {
  console.log(`forEach: ${index}, ${item}`);
});

data.map((item, index) => {
  console.log(`map: ${index}, ${item}`);
});

console.log(data);

let datacopy = [];
datacopy = data.map((item, index) => {
  return 1;
});

console.log("datacopy: ", datacopy);
console.log("data: ", data);
