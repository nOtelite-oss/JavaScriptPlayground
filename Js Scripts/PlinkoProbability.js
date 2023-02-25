const BOX_COUNT = 5; //How many boxes there will be
const BALL_DROP = 1000000000; //How many balls will be droped

// Factoriel Function
const factorial = (() => {
  const cache = { 0: 1, 1: 1 };
  const factorial = (n) => {
    if (n in cache) {
      return cache[n];
    }
    const result = n * factorial(n - 1);
    cache[n] = result;
    return result;
  };
  return factorial;
})();

// Combination Function
const combination = (n, r) => {
  return factorial(n) / (factorial(n - r) * factorial(r));
};

//Calculating closest Ideal result to final result for comparing it with the final result
const idealResult = Array.from({ length: BOX_COUNT }, (e, i) =>
  combination(BOX_COUNT - 1, i)
);

const pascalTotal = idealResult.reduce((total, value) => total + value, 0);
const closestNumber = Math.floor(BALL_DROP / pascalTotal);

const idealResultScaled = idealResult.map((value) => value * closestNumber);

//The function that simulates random ball behaviour
const LeftOrRight = (n) => {
  let sumNumber = 0;

  for (let i = 0; i < n; i++) {
    sumNumber += Math.random() >= 0.5001 ? 0.5 : -0.5;
  }

  return sumNumber;
};

//Final result function
const RandomBoxExperiment = () => {
  let sumBoxes = new Array(BOX_COUNT).fill(0);
  const middleBox = Math.ceil(BOX_COUNT / 2);

  for (let i = 0; i < BALL_DROP; i++) {
    const whichBox =
      middleBox +
      ((BOX_COUNT & 1) === 0 ? 0.5 : 0) +
      LeftOrRight(BOX_COUNT - 1);
    sumBoxes[whichBox - 1] += 1;
  }

  return sumBoxes;
};

let finalResult = RandomBoxExperiment();

//Calculating the deflection
let sumDeflection = {};
for (let i = 1; i < BOX_COUNT + 1; i++) {
  if (idealResultScaled[i] >= finalResult[i]) {
    sumDeflection[i] = idealResultScaled[i] / finalResult[i] - 1;
  } else if (idealResultScaled[i] < finalResult[i]) {
    sumDeflection[i] = finalResult[i] / idealResultScaled[i] - 1;
  }

  if (sumDeflection[i] === Infinity) {
    sumDeflection[i] = 'NaN (Infinity)';
  }
}

console.log('=======================================================');

//Console.log ing the results here:
console.log('Ideal Result: ');
console.log(idealResultScaled); //This logs the ideal result
console.log('Simulation Result: ');
console.log(finalResult); //This logs the final result
console.log('Deflection: ');
console.log(sumDeflection); //This logs the Deflection numbers

console.log('=======================================================');
