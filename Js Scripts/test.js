let sumNumber1 = 0;
let sumNumber2 = 0;

const repeatTime = 10000000;

for (let i = 0; i < repeatTime; i++) {
  sumNumber1 += Math.random() * 10;
}
for (let i = 0; i < repeatTime; i++) {
  sumNumber2 += Math.floor(Math.random() * 10);
}

console.log(sumNumber1 / repeatTime + ' ' + sumNumber2 / repeatTime);
console.log(6 > 6.1);
