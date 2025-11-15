// 'bhanu' - 'unahb'
// 'Software development' - 'tnempoleved erawtfoS'
// "coderbyte" - "etybredoc"
// 'I Love Code' - 'edoC evoL I'

function strRev(str) {
  return str.split('').reverse().join('');
}

//? with loop
function strRev2(str) {
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return newStr;
}

//? with recursion
function strRev3(str) {
  if (str === '') return '';
  else return strRev3(str.substr(1)) + str.charAt(0);
}

console.log(strRev('bhanu'));
console.log(strRev('Software development'));
console.log(strRev('coderbyte'));
console.log(strRev('I Love Code'));
console.log('-------------------------');
console.log(strRev2('bhanu'));
console.log(strRev2('Software development'));
console.log(strRev2('coderbyte'));
console.log(strRev2('I Love Code'));
console.log('-------------------------');
console.log(strRev3('bhanu'));
console.log(strRev3('Software development'));
console.log(strRev3('coderbyte'));
console.log(strRev3('I Love Code'));
