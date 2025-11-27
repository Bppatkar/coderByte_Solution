/* 
Input:- 'fun&!! time'
Output:- time

Input:- 'I love dogs'
Output:- love     
//? if there are two or more words that are the same length, return first word from str
*/

// function longestWord(str) {
//   const words = str.replace(/[^a-zA-Z ]/g, '').split(' ');
//   let longest = '';
//   for (let char of words) {
//     if (char.length > longestWord.length) {
//       longest = char;
//     }
//   }
//   return longest;
// }

//! using reduce

// function longestWord(str) {
//   const words = str.replace(/[^a-zA-Z ]/g, '').split(' ');
//   return words.reduce((longest, current) => {
//     return current.length > longest.length ? current : longest;
//   });
// }

//! using sort
function longestWord(str) {
  return str
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .sort((a, b) => b.length - a.length)[0];
}

console.log(longestWord('fun&!! time'));
console.log(longestWord('I love dogs'));
console.log(longestWord('Hello world123'));
