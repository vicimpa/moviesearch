export function repeat<T>(count: number, callback: (i: number) => T): T[] {
  let array: T[] = []

  for(let i = 0; i < count; i++)
    array.push(callback(i))

  return array
}