import Compressor from 'compressorjs'

export const useFileDialog = () => {
  const getFile = (accept?: string) => {
    const input = document.createElement('input')
    input.type = 'file'
    if (accept) input.accept = accept

    input.click()

    return new Promise<File>((resolve, reject) => {
      input.onerror = (err) => reject(err)
      input.onchange = (e) => {
        const file = (<HTMLInputElement>e.target).files![0]
        if (accept && file.type === accept) {
          resolve(file)
        } else {
        }
        resolve(file)
      }
    })
  }

  return { getFile }
}

export const compress = (file: Blob | File) => {
  return new Promise<Blob>((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.6,
      success: (e) => resolve(e),
      error: (err) => reject(err)
    })
  })
}

export const blobToDataURL = (file: Blob | File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () =>
      resolve(typeof reader.result === 'string' ? reader.result : '')

    reader.readAsDataURL(file)
  })
}
