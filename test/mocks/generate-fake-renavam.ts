export function generateFakeRenavam(): string {
  const baseNumber = Math.floor(Math.random() * 10000000000)
    .toString()
    .padStart(10, '0');

  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(baseNumber[i]) * weights[i];
  }

  const remainder = sum % 11;

  const checkDigit = remainder < 2 ? 0 : 11 - remainder;

  return `${baseNumber}${checkDigit}`;
}
