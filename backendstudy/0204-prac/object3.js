let option = {
  title: "Home",
  width: 300,
  height: 500,
};

const { title, width, height } = option;

console.log(title);
console.log(width);
console.log(height);

let family = {
  grandmother: "Harrison",
  sister: "Ethan",
  brother: "Austin",
};

const { grandmother, sister: baby, brother, grandfather = "Tom" } = family;

console.log(baby);
console.log(grandfather);
