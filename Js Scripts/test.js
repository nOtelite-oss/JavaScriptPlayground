const BOX_COUNT = 5; //How many boxes there will be
const BALL_DROP = 50000; //How many balls will be dropped

// Memoized Factorial Function
const memoizedFactorial = (() => {
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
  return (
    memoizedFactorial(n) / (memoizedFactorial(n - r) * memoizedFactorial(r))
  );
};

// Initializing Ideal Result as an Array
const idealResult = Array.from({ length: BOX_COUNT }, (_, i) =>
  combination(BOX_COUNT - 1, i)
);

// Calculating Closest Ideal Result to Final Result for Comparing It with the Final Result
const pascalTotal = idealResult.reduce((total, value) => total + value, 0);
const closestNumber = Math.floor(BALL_DROP / pascalTotal);
const idealResultScaled = idealResult.map((value) => value * closestNumber);

// The function that simulates random ball behavior
const leftOrRight = (n) => {
  let sumNumber = 0;
  for (let i = 0; i < n; i++) {
    sumNumber += Math.random() >= 0.501 ? 0.5 : -0.5;
  }
  return sumNumber;
};

// Final Result function
const randomBoxExperiment = () => {
  const sumBoxes = new Array(BOX_COUNT).fill(0);
  const middleBox = Math.ceil(BOX_COUNT / 2);

  for (let i = 0; i < BALL_DROP; i++) {
    const whichBox =
      middleBox +
      ((BOX_COUNT & 1) === 0 ? 0.5 : 0) +
      leftOrRight(BOX_COUNT - 1);
    sumBoxes[Math.floor(whichBox) - 1]++;
  }
  return sumBoxes;
};

const sumBoxes = randomBoxExperiment();

// Calculating the Deflection
const sumDeflection = new Array(BOX_COUNT).fill(0);
for (let i = 0; i < BOX_COUNT; i++) {
  const ideal = idealResultScaled[i];
  const sum = sumBoxes[i];
  sumDeflection[i] = ideal >= sum ? ideal / sum - 1 : sum / ideal - 1;
  if (sumDeflection[i] === Infinity) {
    sumDeflection[i] = 'NaN (Infinity)';
  }
}

console.log('=======================================================');

//Console.log ing the results here:
console.log('Ideal Result: ');
console.log(idealResult); //This logs the ideal result
console.log('Simulation Result: ');
console.log(sumBoxes); //This logs the final result
console.log('Deflection: ');
console.log(sumDeflection); //This logs the Deflection numbers

console.log('=======================================================');
