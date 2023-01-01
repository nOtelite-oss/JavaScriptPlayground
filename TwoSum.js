var twoSum = function (nums, target) {
  let numObject = {};
  let finalArray = [];
  let sumArray = [];

  i = 0;
  while (i <= nums.length) {
    numObject[i] = nums[i];
    i++;
  }

  console.log(numObject);

  let allow = true;

  for (let i = 0; i <= nums.length - 1; i++) {
    for (let a = i + 1; a <= nums.length - 1; a++) {
      if (a !== i) {
        if (numObject[i] + numObject[a] === target) {
          finalArray = [i, a];
          allow = false;
          break;
        }
      }
    }
    if (!allow) {
      break;
    }
  }

  sumArray = finalArray.slice(0, 2);

  return sumArray;
};

console.log('Here is result:', twoSum([0, 4, 3, 0], 0));
