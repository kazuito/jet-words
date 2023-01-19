/**
 * Get random integer (min <= x < max)
 * @param min
 * @param max
 * @returns random int
 */
function getRandInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * max);
}

export { getRandInt };
