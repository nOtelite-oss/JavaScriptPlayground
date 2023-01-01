const mainNums = {
  I: 1, //0
  V: 5, //1
  X: 10, //2
  L: 50, //3
  C: 100, //4
  D: 500, //5
  M: 1000, //6
};

const romenToInt = function toInt(rome) {
  const romeEach = rome.split('');
  let sum = 0;
  let i = 0;
  while (true) {
    if (i === romeEach.length) {
      // console.log(group)
      break;
    }
    const group = [romeEach[i]];
    let groupSum = 0;

    while (mainNums[romeEach[i]] < mainNums[romeEach[i + 1]]) {
      console.log(romeEach[i]);
      group.push(romeEach[i + 1]);
      i++;
    }
    if (
      i === romeEach.length - 1 ||
      mainNums[romeEach[i]] >= mainNums[romeEach[i + 1]]
    ) {
      console.log(romeEach[i], 'sec');
      console.log(group, 'group');
      const add = mainNums[group[group.length - 1]];

      const subtract =
        group.length === 1
          ? 0
          : group
              .slice(0, group.length - 1)
              .reduce((a, b) => a + mainNums[b], 0);
      groupSum += add - subtract;
      i++;
    }

    sum += groupSum;
  }
  return sum;
};

let finalNumber = romenToInt('MCMXCIV');

console.log(finalNumber); //returns 1994
