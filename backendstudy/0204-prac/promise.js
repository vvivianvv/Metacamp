const data = new Promise((resolve, reject) => {
  resolve(1);
});

// console.log(data);

data
  .then((res) => {
    console.log("first then: ", res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res + 1);
      }, 1000);
    });
  })
  .then((res) => {
    console.log("second then: ", res);
  });
