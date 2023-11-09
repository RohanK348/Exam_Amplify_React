import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import './styles.css'
import beautify from 'js-beautify'

export const CustomToolbarExample = () => {
  const [value, setValue] = useState('')
  const modules = {
    toolbar: [
      //[{header: [1, 2, false]}],
      ['bold', 'italic', 'underline', 'strike', 'link', 'image']
      //[{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
      //['clean']
    ]
  }

  const formats = [
    //'header',
    'bold',
    'italic',
    'underline',
    'strike',
    /*
    'blockquote',
    'list',
    'bullet',
    'indent',
    */
    'link',
    'image'
  ]
  return (
    <div className="w-full">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export const TextEditorExample = () => {
  const sample = `<h3>Lorem ipsum...</h3>
<p>Madman finer merely valor shield prosaic set justice state Cair stinks legendary. L kingsfoil infectious never terribly means warrior Isildur's asleep glasses deserves people's. Nobody tosses a Dwarf.</p>
<h2>Strongest investment...</h2>
<p>Sing nonsense Balin wound bastards names! Bodyguard Elessar sage bones born deny swung reaches. Nobody tosses a Dwarf.</p>`

  const [value, setValue] = useState(sample)
  let {html} = {...beautify}

  return (
    <>
      <div className="w-full mb-4">
        <div className="w-full">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <div className="text-base font-bold mb-2">Raw HTML</div>
          {value && <pre className="p-2">{html(value)}</pre>}
        </div>
        <div className="w-full lg:w-1/2">
          <div className="text-base font-bold mb-2">Formatted output</div>
          {value && (
            <div className="p-3" dangerouslySetInnerHTML={{__html: value}} />
          )}
        </div>
      </div>
    </>
  )
}
