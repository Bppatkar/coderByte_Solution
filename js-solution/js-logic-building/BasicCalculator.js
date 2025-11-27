const prompt = require('prompt-sync')();
let exit = false;
while (!exit) {
  let userChoice = prompt(`Please select one of the below options
1. Press 1 for Addition
2. Press 2 for Subtraction 
3. Press 3 for Multiplication
4. Press 4 for Division:
5. Press 5 for exit
`);

  userChoice = parseInt(userChoice);

  if (userChoice < 1 || userChoice > 5) {
    console.log('Invalid choice! Please select 1-5');
    continue;
  }

  const { firstNum, secondNum } = acceptTwoNumber();
  switch (userChoice) {
    case 1:
      console.log(`${firstNum} + ${secondNum} = ${firstNum + secondNum}`);
      break;
    case 2:
      console.log(`${firstNum} - ${secondNum} = ${firstNum - secondNum}`);
      break;
    case 3:
      console.log(`${firstNum} * ${secondNum} = ${firstNum * secondNum}`);
      break;
    case 4:
      if (secondNum === 0) {
        console.log('Error: Cannot divide by zero!');
      } else {
        console.log(`${firstNum} / ${secondNum} = ${firstNum / secondNum}`);
      }
      break;
    default:
      console.log('wrong choice');
      break;
  }
}
console.log('thanks for using the calculator');

function acceptTwoNumber() {
  let firstNum = parseInt(prompt('please enter the first number: '));
  let secondNum = parseInt(prompt('please enter the second number: '));

  return { firstNum, secondNum };
}
