export function validateRenavam(renavam?: string | null): boolean {
  if (!renavam) {
    return false;
  }
  
  const renavamNormalized = renavam.padStart(11, '0');

  if (!/^\d{11}$/.test(renavamNormalized)) {
    return false;
  }

  const body = renavamNormalized.substring(0, 10);
  const checkDigit = parseInt(renavamNormalized.charAt(10), 10);

  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;

  for (let i = 0; i < 10; i++) {
    const digit = parseInt(body.charAt(i), 10);
    sum += digit * weights[i];
  }

  const remainder = sum % 11;

  let calculatedCheckDigit = 0;

  if (remainder === 0 || remainder === 1) {
    calculatedCheckDigit = 0;
  } else {
    calculatedCheckDigit = 11 - remainder;
    if (calculatedCheckDigit === 10) {
      calculatedCheckDigit = 1;
    }
  }

  return checkDigit === calculatedCheckDigit;
}
