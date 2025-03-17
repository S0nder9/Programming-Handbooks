const colors = ["red", "green", "blue"];

const dates = [new Date(), new Date()];

const fruitsByColor = [["apple", "pear"], ["banana"], ["grape"]];

const color = colors[0];
const color1 = colors.pop();
colors.push("purple");

colors.map((color: string): string => {
  return color.toUpperCase();
});

const importantDates: (string | Date)[] = [new Date(), "2030-10-10"];
importantDates.push("2030-11-11");
importantDates.push(new Date("2020, 21, 21"));
  