import React, {useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'

const Previews = props => {
  const [files, setFiles] = useState([])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

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
      <div className="flex flex-row w-full items-center justify-start flex-wrap space-x-4 mt-4 py-2">
        {files.map((file, i) => (
          <div className="bg-white dark:bg-grey-800 h-48 w-48" key={i}>
            <img
              src={file.preview}
              alt="thumbnail"
              className="h-full w-48 object-cover rounded-lg shadow"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Previews
