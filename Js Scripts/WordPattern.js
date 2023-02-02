const wordPattern = function (pattern, s) {
  let sMergedList = s.split(' ');

  if (sMergedList.length !== pattern.split('').length) {
    console.log('Different Lengths');
    return false;
  }

  let patternSum = {};
  let sSum = {};

  let a = 0;
  let b = 0;

  let x = 1;
  let y = 1;

  for (i = 0; i < pattern.length; i++) {
    //pattern
    if (patternSum[pattern[i][0]] === undefined) {
      patternSum[pattern[i]] = a;
      a++;
    } else {
      patternSum[pattern[i] + x] = patternSum[pattern[i]];
      x++;
    }
  }

  for (i = 0; i < sMergedList.length; i++) {
    //s
    if (sSum[sMergedList[i]] === undefined) {
      sSum[sMergedList[i]] = b;
      b++;
    } else {
      sSum[sMergedList[i] + y] = sSum[sMergedList[i]];
      y++;
    }
  }

  console.log('pattern: ', patternSum);
  console.log('s:       ', sSum);

  let answer = true;

  for (i = 0; i < pattern.length; i++) {
    if (Object.values(patternSum)[i] !== Object.values(sSum)[i]) {
      answer = false;
      break;
    }
  }

  return answer;
};

console.log(wordPattern('abbxfg', 'Horse car car ca Turkish callofduty2')); //Test
