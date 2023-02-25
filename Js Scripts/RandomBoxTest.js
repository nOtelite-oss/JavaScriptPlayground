const BOX_COUNT = 5;
const BALL_DROP = 99999999;

const Factoriel = (n) => {
  if (n === 0) {
    return 1;
  }

  let sumFactoriel = 1;
  for (let i = n; i > 0; i--) {
    sumFactoriel *= i;
  }

  return sumFactoriel;
};

const Combination = (n, r) => {
  return Factoriel(n) / (Factoriel(n - r) * Factoriel(r));
};

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

console.log(idealResult);

const LeftOrRight = (n, oddOrEven) => {
  let sumNumber = 0;

  if (oddOrEven) {
    for (let i = 0; i < n; i++) {
      const randomNumber = Math.random();
      if (randomNumber >= 0.501) {
        sumNumber += 0.5;
      } else {
        sumNumber -= 0.5;
      }
    }
  } else {
    for (let i = 0; i < n; i++) {
      const randomNumber = Math.random();
      if (randomNumber >= 0.501) {
        sumNumber += 1;
      } else {
        sumNumber -= 1;
      }
    }
  }

  return sumNumber;
};

const RandomBoxExperiment = () => {
  let sumBoxes = {};

  for (let i = 1; i < BOX_COUNT + 1; i++) {
    sumBoxes[i] = 0;
  }

  const middleBox = Math.round(BOX_COUNT / 2);

  if (BOX_COUNT % 2 === 0) {
  } else {
    for (let i = 0; i < BALL_DROP; i++) {
      const WhichBox = LeftOrRight(BOX_COUNT - 1, true);
      sumBoxes[middleBox + WhichBox] += 1;
    }
  }

  return sumBoxes;
};

let sumBoxes = RandomBoxExperiment();

console.log(sumBoxes);

let sumDeflection = {};

for (let i = 1; i < BOX_COUNT + 1; i++) {
  sumDeflection[i] = idealResult[i] / sumBoxes[i] - 1;
}

console.log(sumDeflection);
