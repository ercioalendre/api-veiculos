export function generateFakeLicensePlate(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const digits = '0123456789';

  const part1 = Array.from(
    { length: 3 },
    () => letters[Math.floor(Math.random() * letters.length)],
  ).join('');

  const digit1 = digits[Math.floor(Math.random() * digits.length)];

  const letter = letters[Math.floor(Math.random() * letters.length)];

  const part2 = Array.from(
    { length: 2 },
    () => digits[Math.floor(Math.random() * digits.length)],
  ).join('');

  return `${part1}${digit1}${letter}${part2}`;
}
