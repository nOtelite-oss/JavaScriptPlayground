const BOX_COUNT = 5;
const BALL_DROP = 1000;

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function combination(n, r) {
  return factorial(n) / (factorial(n - r) * factorial(r));
}

let idealResult = {};
for (let i = 1; i <= BOX_COUNT; i++) {
  idealResult[i] = combination(BOX_COUNT - 1, i - 1);
}

let pascalTotal = Object.values(idealResult).reduce((sum, val) => sum + val, 0);
const closestNumber = Math.floor(BALL_DROP / pascalTotal);

Object.keys(idealResult).forEach((element) => {
  idealResult[element] *= closestNumber;
});

function leftOrRight(n, oddOrEven) {
  let sumNumber = 0;

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.random();
    sumNumber += (randomNumber >= 0.501 ? 0.5 : -0.5) * (oddOrEven ? 1 : 2);
  }

  return sumNumber;
}

function randomBoxExperiment() {
  let sumBoxes = {};
  for (let i = 1; i <= BOX_COUNT; i++) {
    sumBoxes[i] = 0;
  }

  const middleBox = Math.ceil(BOX_COUNT / 2);
  for (let i = 0; i < BALL_DROP; i++) {
    const whichBox =
      middleBox + leftOrRight(BOX_COUNT - 1, BOX_COUNT % 2 === 0);
    sumBoxes[whichBox] += 1;
  }

  return sumBoxes;
}

let sumBoxes = randomBoxExperiment();

let sumDeflection = {};

Object.keys(sumBoxes).forEach((element) => {
  sumDeflection[element] = idealResult[element] / sumBoxes[element] - 1;
});

console.log(sumDeflection);
