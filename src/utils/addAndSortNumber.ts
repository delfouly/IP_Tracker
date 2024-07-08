/**
 * Adds a new number to the given array of numbers and sorts the array in ascending order.
 *
 * @param {number[]} numberArray - The array of numbers to add the new number to.
 * @param {number} newNumber - The new number to add to the array.
 * @returns {number[]} - The sorted array of numbers after adding the new number.
 */
export function addAndSortNumber(numberArray: number[], newNumber: number) {
  if (!numberArray.includes(newNumber)) {
    numberArray.push(newNumber);
    numberArray.sort((a, b) => a - b);
  }

  return numberArray;
}
