const movie = [{ name: "Titanic" }, { name: "Matrix" }, { name: "FightClub" }];

const movie1 = { ...movie }; // spread operator

console.log("movie: ", movie);
console.log("movie1: ", movie1);

const datacopy = movie.map((item, index) => {
  const { name } = item;
  const id = index;
  // item = { id: index, ...item };
  // console.log(item);
  if (name === "Titanic") {
    item = { id, ...item, year: 1997 };
  } else if (name === "Matrix") {
    item = { id, ...item, year: 1997 };
  } else if (name === "FightClub") {
    item = { id, ...item, year: 1999 };
  }
  return item;
});
console.log(datacopy);
