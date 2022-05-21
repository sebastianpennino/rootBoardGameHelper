/**
 * Lodash Array shuffle (altered by me)
 * @source https://github.com/lodash/lodash/blob/master/shuffle.js
 * @param array to be shuffled
 * @returns new shuffled array
 */
export function shuffle(array: Array<any>): Array<any> {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = [...array] // Shallow copy
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}

/**
 * Really slow seeded shuffle (altered by me)
 * @source https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed
 */
export function seededShuffle<T>(array: Array<T>, seed: number): Array<T> {
  const clone: Array<T> = [...array] // Shallow copy
  let countdown: number = clone.length
  let ref: T = clone[countdown]
  let pickIndex: number = 0

  // While there remain elements to shuffle
  while (countdown) {
    // Pick a remaining element
    pickIndex = Math.floor(randomWithSine(seed) * countdown--)
    // And swap it with the current element
    ref = clone[countdown]
    clone[countdown] = clone[pickIndex]
    clone[pickIndex] = ref
    ++seed
  }

  return clone
}

function randomWithSine(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}
