function isStrongPassword(str) {
  let passStr = str.trim();
  if (passStr.length < 0) {
    return false;
  }
  const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@';

  let lowerCaseCharactersExists = false;
  let upperCaseCharactersExists = false;
  let numberExists = false;
  let specialCharExists = false;

  for (let elem of str) {
    if (lowerCaseCharacters.includes(elem)) {
      lowerCaseCharactersExists = true;
    } else if (upperCaseCharacters.includes(elem)) {
      upperCaseCharactersExists = true;
    } else if (numbers.includes(elem)) {
      numberExists = true;
    } else if (specialChars.includes(elem)) {
      specialCharExists = true;
    }
  }

  if (
    lowerCaseCharactersExists &&
    upperCaseCharactersExists &&
    numberExists &&
    specialCharExists
  ) {
    return true;
  }
  return false;
}

console.log('Ash1! is ', isStrongPassword('Ash1!'));
console.log('Ashish1! is ', isStrongPassword('Ashish1!'));

console.log('Ash1! is ', isStrongPassword('Ash1!'));
console.log('Ashis1! is ', isStrongPassword('Ashis1!'));
console.log('ashish1! is ', isStrongPassword('ashish1!'));
console.log('ashisha! is ', isStrongPassword('ashisha!'));
console.log('ashish1a is ', isStrongPassword('ashish1a'));
