const BOX_COUNT = 35; //How many boxes there will be
const BALL_DROP = 2000000000; //How many balls will be dropped
const SOLUTION_WAY = 1; //0 --> Calculating ball fall pattern, 1 --> Calculating ball fall with Gaussian distribution>

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
const closestNumber = Math.round(BALL_DROP / pascalTotal);

const idealResultScaled = idealResult.map((value) => value * closestNumber);

//The function that simulates random ball behaviour
const LeftOrRight = (n) => {
  let sumNumber = 0;

  for (let i = 0; i < n; i++) {
    sumNumber += Math.random() >= 0.50001 ? 0.5 : -0.5;
  }

  return sumNumber;
};

//Final result function
const RandomBoxExperiment = () => {
  let sumBoxes = new Array(BOX_COUNT).fill(0);
  const middleBox = Math.ceil(BOX_COUNT / 2);

  if (BALL_DROP > 20000000) {
    let section = 0;
    let processParts = 50;
    console.log('Processing:');
    process.stdout.write('0%');

    if (SOLUTION_WAY === 0) {
      for (let i = 0; i < processParts; i++) {
        for (let i = 0; i < BALL_DROP / processParts; i++) {
          const whichBox =
            middleBox +
            ((BOX_COUNT & 1) === 0 ? 0.5 : 0) +
            LeftOrRight(BOX_COUNT - 1);
          sumBoxes[whichBox - 1] += 1;
        }

        section += 100 / processParts;
        process.stdout.write(` ${section}%`);
      }
    } else if (SOLUTION_WAY === 1) {
      const boxDropPossibilitys = [];
      for (let i = 0; i < BOX_COUNT; i++) {
        boxDropPossibilitys.push(idealResult[i] / pascalTotal);
      }

      let currentP = boxDropPossibilitys[0];
      let randomNumber = Math.random();
      for (let i = 0; i < processParts; i++) {
        for (let i = 0; i < BALL_DROP / processParts; i++) {
          let currentP = boxDropPossibilitys[0];
          let randomNumber = Math.random();

          for (let i = 0; i < BOX_COUNT; i++) {
            if (randomNumber < currentP) {
              sumBoxes[i] += 1;
              currentP = boxDropPossibilitys[0];
              randomNumber = Math.random();
              break;
            } else {
              currentP += boxDropPossibilitys[i + 1];
            }
          }
        }
        section += 100 / processParts;
        process.stdout.write(` ${section}%`);
      }
    }
  } else {
    if (SOLUTION_WAY === 0) {
      for (let i = 0; i < BALL_DROP; i++) {
        const whichBox =
          middleBox +
          ((BOX_COUNT & 1) === 0 ? 0.5 : 0) +
          LeftOrRight(BOX_COUNT - 1);
        sumBoxes[whichBox - 1] += 1;
      }
    } else if (SOLUTION_WAY === 1) {
      const boxDropPossibilitys = [];
      for (let i = 0; i < BOX_COUNT; i++) {
        boxDropPossibilitys.push(idealResult[i] / pascalTotal);
      }

      for (let i = 0; i < BALL_DROP; i++) {
        let currentP = boxDropPossibilitys[0];
        let randomNumber = Math.random();

        for (let i = 0; i < BOX_COUNT; i++) {
          if (randomNumber < currentP) {
            sumBoxes[i] += 1;
            currentP = boxDropPossibilitys[0];
            randomNumber = Math.random();
            break;
          } else {
            currentP += boxDropPossibilitys[i + 1];
          }
        }
      }
    }
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
}

const Log = (n) => console.log(n); //Console logs the argument
const LogNL = (n) => process.stdout.write(n); //Console logs the argument without a new line

Log(' ');
Log('=======================================================START');

//Logg ing the results here:
Log('Box Count: ' + BOX_COUNT + ', Ball Count: ' + BALL_DROP);
Log(' ');

Log('Ideal Result: ');
Log(idealResultScaled); //This logs the ideal result
Log('Simulation Result: ');
Log(finalResult); //This logs the final result
Log('Deflection %: ');
Log(sumDeflection); //This logs the Deflection numbers

Log('=======================================================END');
