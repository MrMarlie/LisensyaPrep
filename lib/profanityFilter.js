// Profanity filter — checks a string for banned words
// Words are stored as split fragments to avoid plain-text indexing

const BANNED = [
  // F-word and variants
  ['f', 'u', 'c', 'k'],
  ['f', 'u', 'k'],
  ['f', 'k', 'k'],
  ['f', 'u', 'c', 'c'],
  // S-word
  ['s', 'h', 'i', 't'],
  ['s', 'h', '1', 't'],
  // N-word (hard and soft r)
  ['n', 'i', 'g', 'g', 'e', 'r'],
  ['n', 'i', 'g', 'g', 'a'],
  ['n', 'i', 'g'],
  // B-word
  ['b', 'i', 't', 'c', 'h'],
  // A-word
  ['a', 's', 's', 'h', 'o', 'l', 'e'],
  ['a', 's', 's'],
  // C-word
  ['c', 'u', 'n', 't'],
  // D-word
  ['d', 'i', 'c', 'k'],
  // P-word
  ['p', 'u', 's', 's', 'y'],
  // Slurs
  ['f', 'a', 'g', 'g', 'o', 't'],
  ['f', 'a', 'g'],
  ['r', 'e', 't', 'a', 'r', 'd'],
  ['w', 'h', 'o', 'r', 'e'],
  ['s', 'l', 'u', 't'],
  ['b', 'a', 's', 't', 'a', 'r', 'd'],
  ['d', 'a', 'm', 'n'],
  ['c', 'r', 'a', 'p'],
].map((parts) => parts.join(''));

export function containsProfanity(str) {
  // Normalize: lowercase, collapse repeated chars (fuuuck → fuck), strip spaces
  const normalized = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // strip non-alphanumeric
    .replace(/(.)\1+/g, '$1'); // collapse repeated letters (fuuck → fuk)

  return BANNED.some((word) => normalized.includes(word));
}
