var middleNode = function (head) {
  let finalList = [];

  if (head.length % 2 === 0) {
    for (i = head.length / 2; i < head.length; i++) {
      finalList.push(head[i]);
    }
  } else {
    for (i = (head.length - 1) / 2; i < head.length; i++) {
      finalList.push(head[i]);
    }
  }
  return finalList;
};

console.log(middleNode([1, 2, 3]));
