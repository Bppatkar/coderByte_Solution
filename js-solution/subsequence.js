// let array = [5, 1, 22, 25, 6, -1, 8, 10];
// let subsequence = [1, 6, -1, 10];

// Find array is subsequence of given array or not
// an array is a subsequence of the original array if it is made up entirely of elements from the original array and also the elements should be in the same order.
function isValidSubsequence(array, sequence) {
  let arrIndex = 0;
  let seqIndex = 0;

  while (arrIndex < array.length && seqIndex < sequence.length) {
    if (array[arrIndex] === sequence[seqIndex]) {
      seqIndex++; // Move to next element in sequence
    }
    arrIndex++; // Always move array pointer
  }

  return seqIndex === sequence.length;
}

// Test
let array = [5, 1, 22, 25, 6, -1, 8, 10];
let subsequence = [1, 6, -1, 10];

console.log(isValidSubsequence(array, subsequence)); // true
