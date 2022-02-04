const example = (cb1, cb2, num) => {
  cb1(num);
  cb2(num);
};

const test1 = (num) => {
  console.log(num * 5);
};

const test2 = (num) => {
  if (num > 5) {
    console.log("num이 5보다 큼");
  } else {
    console.log("num이 5와 같거나 작음");
  }
};

example(test1, test2, 3);
example(test1, test2, 10);
