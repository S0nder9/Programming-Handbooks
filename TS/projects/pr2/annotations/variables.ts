let oranges: number = 5;
let speed: string = "fast";
let hasDog: boolean = true;
let nothing: null = null;
let nothing1: undefined = undefined;

let now: Date = new Date();
let colors: string[] = ["red", "yellow"];
let numbers: number[] = [5, 10, 11];
let results: boolean[] = [true, false];

class Car {}

let car: Car = new Car();

let point: { x: number; y: number } = {
  x: 1,
  y: 2,
};

const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);

let words = ["one", "two"];
let isTwo: boolean;

for (let i of words) {
  if (i === "two") {
    isTwo = true;
  }
}
