/* 
Have the function CodeandUsernameValidation(str) take the str parameter being passed and determine if the string is a valid username according to the following rules:

The username is between 4 and 25 characters.
It must start with a letter.
It can only contain letters, numbers, and the underscore character.
It cannot end with an underscore character.

If the username is valid then your program should return the string true, otherwise return the string false.

Examples
Input: "aa_"
Output: false

Input: "u__hello_world123"
Output: true

*/

function CodeandUsernameValidation(str) {
  if (str.length < 4 || str.length > 25) {
    return false;
  }
  if (!/^[a-zA-Z]/.test(str)) {
    return false;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(str)) {
    return false;
  }

  if (str.endsWith('_')) {
    return false;
  }

  return true;
}

console.log(CodeandUsernameValidation('aa_'));
console.log(CodeandUsernameValidation('u__hello_world123'));
console.log(CodeandUsernameValidation('abc'));
console.log(CodeandUsernameValidation('1username'));
console.log(CodeandUsernameValidation('user@name'));
console.log(CodeandUsernameValidation('username_'));
