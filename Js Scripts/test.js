const BOX_COUNT = 5;
const BALL_DROP = 9999;

function LeftOrRight(n) {
  let sumNumber = 0;

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.random() * 10 + 1;
    if (randomNumber >= 6) {
      sumNumber += 1;
    } else {
      sumNumber -= 1;
    }
  }

  return sumNumber;
}

function RandomBoxExperiment() {
  const sumBoxes = new Array(BOX_COUNT).fill(0);
  const middleBox = Math.floor(BOX_COUNT / 2);

  for (let i = 0; i < BALL_DROP; i++) {
    const whichBox =
      middleBox + LeftOrRight(BOX_COUNT % 2 === 0 ? BOX_COUNT - 1 : BOX_COUNT);
    sumBoxes[whichBox] += 1;
  }

  console.log(sumBoxes);
}

RandomBoxExperiment();
