//Bhanu Pratap -
/* 
B: 1
h:1
a: 3
n: 1
u: 1
p: 2
r:1
t:1
*/

function countCharacters(str) {
  let result = {};
  let newStr = str.trim().toLowerCase();

  for (let i = 0; i < newStr.length; i++) {
    if (!result[newStr[i]]) {
      result[newStr[i]] = 0;
    }
    result[newStr[i]] = result[newStr[i]] + 1;
  }
  return result;
}

function countCharacters2(str) {
  let newSplitedStr = str.trim().toLowerCase().split('');
  let result = newSplitedStr.reduce((acc, char) => {
    if (!acc[char]) {
      acc[char] = 0;
    }
    acc[char] = acc[char] + 1;
    return acc;
  }, {});
  return result;
}
console.log('Bhanu Pratap Patkar 1', countCharacters('Bhanu Pratap Patkar 1'));

console.log('countCharacters2');

console.log('Anurag Patkar 12', countCharacters2('Anurag Patkar 12'));
