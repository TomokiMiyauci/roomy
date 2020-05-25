export const resize = (
  dataURL: string,
  size: { width: number; height: number }
): Promise<string> => {
  const img = document.createElement('img')
  const canvas = document.createElement('canvas')

  img.src = dataURL

  return new Promise((resolve, reject) => {
    img.onerror = () => reject(Error('Error'))
    img.onload = () => {
      const { width, height } = size
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg'))
    }
  })
}
