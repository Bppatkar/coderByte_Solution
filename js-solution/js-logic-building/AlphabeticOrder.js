// 'acehkosvz' = true
// 'abcab' = false

console.log('a'.charCodeAt(0));
console.log('b'.charCodeAt(0));
console.log('z'.charCodeAt(0));

console.log('A'.charCodeAt(0));
console.log('Z'.charCodeAt(0));

console.log('a' < 'b'); // true
console.log('b' < 'a'); // false

function isStringInAlphabeticOrder(str) {
  let newStr = str.toLowerCase().replace(/ /g, '');
  for (let i = 0; i < newStr.length - 1; i++) {
    if (newStr[i] > newStr[i + 1]) {
      return false;
    }
  }
  return true;
}
console.log('acgz', isStringInAlphabeticOrder('acgz'));
console.log('acagz', isStringInAlphabeticOrder('acagz'));

console.log('ac g z', isStringInAlphabeticOrder('ac g z'));

console.log('aAc g z', isStringInAlphabeticOrder('aAc g z'));
