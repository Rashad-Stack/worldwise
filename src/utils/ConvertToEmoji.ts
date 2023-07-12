export function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  console.log(String.fromCodePoint(...codePoints));
  return String.fromCodePoint(...codePoints);
}
