export function swapArrayElements<T>(arr: T[], index1: number, index2: number): void {
  if (index1 < 0 || index1 >= arr.length || index2 < 0 || index2 >= arr.length) {
    throw new Error("Index out of bounds");
  }

  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
