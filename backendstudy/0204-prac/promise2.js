const data = (num) =>
  new Promise((resolve, reject) => {
    if (typeof num === "number") resolve(num);
    else reject("숫자가 아님");
  });

data(2)
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res + 1);
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res + 1);
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res + 1);
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res + 1);
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res + 1);
      }, 1000);
    });
  });
