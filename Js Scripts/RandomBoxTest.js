const BOX_COUNT = 10; //How many boxes there will be
const BALL_DROP = 10000; //How many balls will be droped

// Factoriel Function
const Factoriel = (n) => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

//Combination Function
const Combination = (n, r) => {
  return Factoriel(n) / (Factoriel(n - r) * Factoriel(r));
};

//Calculating closest Ideal result to final result for comparing it with the final result
const idealResult = {};
for (let i = 1; i < BOX_COUNT + 1; i++) {
  idealResult[i] = Combination(BOX_COUNT - 1, i - 1);
}

let pascalTotal = 0;

Object.values(idealResult).forEach((element) => {
  pascalTotal += element;
});
const closestNumber = Math.floor(BALL_DROP / pascalTotal);

Object.keys(idealResult).forEach((element) => {
  idealResult[element] *= closestNumber;
});

//The function that simulates random ball behaviour
const LeftOrRight = (n) => {
  let sumNumber = 0;

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.random();
    if (randomNumber >= 0.501) {
      sumNumber += 0.5;
    } else {
      sumNumber -= 0.5;
    }
  }

  return sumNumber;
};

//Final result function
const RandomBoxExperiment = () => {
  let sumBoxes = {};

  for (let i = 1; i < BOX_COUNT + 1; i++) {
    sumBoxes[i] = 0;
  }

  const middleBox = Math.ceil(BOX_COUNT / 2);

  for (let i = 0; i < BALL_DROP; i++) {
    const whichBox =
      middleBox +
      ((BOX_COUNT & 1) === 0 ? 0.5 : 0) +
      LeftOrRight(BOX_COUNT - 1);
    sumBoxes[whichBox] += 1;
  }

  return sumBoxes;
};

let sumBoxes = RandomBoxExperiment();

//Calculating the deflection
let sumDeflection = {};
for (let i = 1; i < BOX_COUNT + 1; i++) {
  if (idealResult[i] >= sumBoxes[i]) {
    sumDeflection[i] = idealResult[i] / sumBoxes[i] - 1;
  } else if (idealResult[i] < sumBoxes[i]) {
    sumDeflection[i] = sumBoxes[i] / idealResult[i] - 1;
  }

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
