// 'cat' - 'act'
// 'elbow' - 'below'
// 'night' - 'thing'
// 'heart' - 'earth'
// 'pools' - 'spool'

function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  let newStr1 = str1.trim().toLowerCase();
  let newStr2 = str2.trim().toLowerCase();

  const charInStr1 = {};
  for (let char of newStr1) {
    charInStr1[char] = (charInStr1[char] || 0) + 1;
  }

  const charInStr2 = {};
  for (let char of newStr2) {
    charInStr2[char] = (charInStr2[char] || 0) + 1;
  }

  for (let key in charInStr1) {
    if (charInStr1[key] !== charInStr2[key]) {
      return false;
    }
  }
  return true;
}

console.log('pools spool', areAnagrams('pools', 'spool'));

console.log('cat act', areAnagrams('cat', 'act'));

console.log('night thing', areAnagrams('night', 'thing'));

console.log('night think', areAnagrams('night', 'think'));

console.log('1night thin1g', areAnagrams('1night', 'thin1g'));

console.log('1night thin2g', areAnagrams('1night', 'thin2g'));

console.log('ashish rahul', areAnagrams('ashish', 'rahul'));
