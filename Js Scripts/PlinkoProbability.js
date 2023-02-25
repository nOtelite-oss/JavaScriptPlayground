const BOX_COUNT = 5; //How many boxes there will be
const BALL_DROP = 1; //How many balls will be dropped

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

const largeCombination = (n, r) => {
  if (r === 0) {
    return n;
  }

  let result = 1;
  for (let i = n; i > n - r; i--) {
    result *= i;
  }
  result = result / factorial(r);
  return result;
};

//Calculating closest Ideal result to final result for comparing it with the final result
const idealResult = Array.from({ length: BOX_COUNT }, (e, i) =>
  combination(BOX_COUNT - 1, i)
);

const pascalTotal = idealResult.reduce((total, value) => total + value, 0);
const closestNumber = Math.round(BALL_DROP / pascalTotal);

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
for (let i = 0; i < BOX_COUNT; i++) {
  sumDeflection[i + 1] = Math.abs(
    (finalResult[i] * 100) / idealResultScaled[i] - 100
  );

  if (sumDeflection[i + 1] === Infinity) {
    sumDeflection[i] = 'NaN (Infinity)';
  }
}

//Calculating the probability of the result
const allPossibleResults = largeCombination(
  BALL_DROP + BOX_COUNT - 1,
  BOX_COUNT - 1
);

const Log = (n) => console.log(n); //Console logs the argument
const LogNL = (n) => process.stdout.write(n); //Console logs the argument without a new line

Log('=======================================================');

//Logg ing the results here:
Log('Box Count: ' + BOX_COUNT + ', Ball Count: ' + BALL_DROP);
Log(' ');

Log('Ideal Result: ');
Log(idealResultScaled); //This logs the ideal result
Log('Simulation Result: ');
Log(finalResult); //This logs the final result
Log('Deflection %: ');
Log(sumDeflection); //This logs the Deflection numbers

Log(' ');
LogNL('Total Number Of Probabilities: ');
Log(allPossibleResults);

Log('=======================================================');
