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
