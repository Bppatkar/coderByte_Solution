// sum of its proper divisors, excluding itself, equals the number itself
// 6,28,496,8128 these are perfect numbers
function isPerfectNumber(num) {
  if (num < 0) return;

  const properDivisor = [];

  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      properDivisor.push(i);
    }
  }
  let sum = 0;
  properDivisor.forEach((e) => (sum += e));

  return sum == num;
}

console.log('6 is ', isPerfectNumber(6));

console.log('5 is ', isPerfectNumber(5));

console.log('28 is ', isPerfectNumber(28));
