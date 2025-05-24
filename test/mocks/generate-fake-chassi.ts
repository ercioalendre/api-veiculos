export function generateFakeChassi(): string {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';

  const wmi = Array.from(
    { length: 3 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');

  const vds = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');

  const checkDigit = Math.floor(Math.random() * 10).toString();

  const vis = Array.from(
    { length: 7 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');

  return `${wmi}${vds}${checkDigit}${vis}`;
}
