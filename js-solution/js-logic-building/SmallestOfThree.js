function smallestOfThree(a, b, c) {
  return a < b ? a : b < c ? b : c < a ? c : a;
}

function smallestOfThreeWithSort(arr) {
  arr.sort((a, b) => a - b);
  return arr[0];
}

function withMathMin(a, b, c) {
  console.log(Math.min(a, b, c));
}

console.log('with math min', withMathMin(3, 3, 3));
console.log('with math min', withMathMin(-1, -6, 9));
console.log('with math min', withMathMin(3, 1, 6));
console.log('------------------------------');
console.log(smallestOfThree(6, 9, 12));

console.log('smallestOfThree(3, 1, 6)', smallestOfThree(3, 1, 6));
console.log('smallestOfThree(-1, -6, 9)', smallestOfThree(-1, -6, 9));

console.log('smallestOfThree(3, 3, 3)', smallestOfThree(3, 3, 3));
console.log('smallestOfThree(3, 3, 1)', smallestOfThree(3, 3, 1));
console.log(
  'smallestOfThree("gsdgsg", 3, 4)',
  smallestOfThree('asdasda', 3, 4)
);
console.log('------------------------------');

console.log('with sorting', smallestOfThreeWithSort([5, 8, 12]));

console.log('with sorting(-1, -6, 9)', smallestOfThreeWithSort([-1, -6, 9]));

console.log('with sorting(3, 3, 3)', smallestOfThreeWithSort([3, 3, 3]));
console.log('with sorting(3, 3, 1)', smallestOfThreeWithSort([3, 3, 1]));
