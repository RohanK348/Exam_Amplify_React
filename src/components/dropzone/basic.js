import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const Basic = () => {
  const [status, setStatus] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(async file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      //reader.readAsArrayBuffer(file)

      var formData = new FormData()
      formData.append('file', file)

      const res = await fetch('http://localhost:8000', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      setStatus(data)
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`${
            isDragActive ? 'bg-grey-100 dark:bg-grey-800' : 'bg-grey-50 dark:bg-grey-700'
          } border-dashed border-4 border-grey-200 dark:border-grey-600 p-8 h-32 w-full flex items-center justify-center`}>
          <div className="font-bold text-base">
            Drag and drop some files here, or click to select files
          </div>
        </div>
      </div>
      {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
    </>
  )
}

export default Basic
