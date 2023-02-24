const BOX_COUNT = 31;
const BALL_DROP = 99999999;

const LeftOrRight = (n, oddOrEven) => {
  let sumNumber = 0;

  if (oddOrEven) {
    for (let i = 0; i < n; i++) {
      const randomNumber = Math.random() * 10 + 1;
      if (randomNumber >= 6) {
        sumNumber += 0.5;
      } else {
        sumNumber -= 0.5;
      }
    }
  } else {
    for (let i = 0; i < n; i++) {
      const randomNumber = Math.random() * 10 + 1;
      if (randomNumber >= 6) {
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

  console.log(sumBoxes);
};

RandomBoxExperiment();
