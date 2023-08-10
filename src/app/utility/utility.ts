export function isValidNumber(input: string): boolean {
  return /^[0-9]+$/.test(input);
}
