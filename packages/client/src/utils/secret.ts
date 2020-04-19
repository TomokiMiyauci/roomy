// import { randomBytes } from 'crypto'

// export const generateRandomB64 = (length: number = 256): string => {
//   return encodeURI(
//     randomBytes(length)
//       .toString('base64')
//       .substring(0, length)
//   )
// }

export const generateRandomB64 = (length: number = 256): string => {
  return length.toString()
}
