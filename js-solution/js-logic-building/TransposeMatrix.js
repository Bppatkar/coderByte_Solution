function transposeMatrix(inputArr) {
  const numOfRow = inputArr.length;
  const numOfCol = inputArr[0].length;

  // console.log('row:', numOfRow);
  // console.log('col:', numOfCol);

  const result = [];

  for (let i = 0; i < numOfRow; i++) {
    for (let j = 0; j < numOfCol; j++) {
      // console.log(inputArr[i][j]);
      if (!result[j]) {
        result[j] = [];
      }
      result[j][i] = inputArr[i][j];
    }
  }
  return result;
}

const inputMatrix = [
  [3, 4, 8],
  [5, 6, 9],
];

console.log(transposeMatrix(inputMatrix));

const inputMatrix2 = [
  [3, 4, 8, 11],
  [5, 6, 9, 12],
];
console.log(transposeMatrix(inputMatrix2));

const inputMatrix3 = [
  [3, 4],
  [5, 6],
  [7, 8],
];
console.log(transposeMatrix(inputMatrix3));

const inputMatrix4 = [
  [3, 4],
  [5, 6, 9, 12],
];
console.log(transposeMatrix(inputMatrix4));
