import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import SectionTitle from '../section-title'

export const CodeStructure = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  )
  const {name} = {...config}
  return (
    <div className="mb-8">
      <SectionTitle
        title="Code structure"
        subtitle="File and folder code structure"
      />
      <p className="mb-2">
        <span className="font-bold">{name}</span> uses the default{' '}
        <a
          className="link"
          href="https://create-react-app.dev/docs/getting-started/"
          target="_blank"
          rel="noopener noreferrer">
          Create React App
        </a>{' '}
        file and folder code structure. For more information on the project and
        to familiarize yourself with the file and folder structure used in a{' '}
        <a
          className="link"
          href="https://create-react-app.dev/docs/getting-started/"
          target="_blank"
          rel="noopener noreferrer">
          Create React App
        </a>{' '}
        application, please go to the{' '}
        <a
          className="link"
          href="https://create-react-app.dev/docs/getting-started/"
          target="_blank"
          rel="noopener noreferrer">
          Create React App
        </a>{' '}
        website.
      </p>
    </div>
  )
}

export const NamingConventions = () => (
  <div className="mb-8">
    <SectionTitle
      title="Naming conventions"
      subtitle="File and folder definitions and naming conventions used in the template"
    />
    <p className="mb-2">
      All pages are located in the <code>src/pages</code> folder. There are no
      restrictions on where you put your pages, so feel free to modify this
      naming convention.
    </p>

    <p className="mb-2">
      All components and widgets are located in the
      <code>src/components</code> folder.
    </p>

    <p className="mb-2">
      All layouts and structural views are located in the
      <code>src/layouts</code> folder.
    </p>

    <p className="mb-2">
      CSS files are located in the
      <code>src/css</code> folder.
    </p>
  </div>
)

export const Folders = () => {
  const items = [
    {
      folder: 'src/components',
      description:
        'Includes all the components ands widgets included in the template'
    },
    {folder: 'src/css', description: 'Includes CSS files'},
    {
      folder: 'src/layouts',
      description: 'Includes all layouts and structural views'
    },
    {
      folder: 'src/css/layouts',
      description: 'Includes CSS for all the included layouts'
    },
    {
      folder: 'src/css/components',
      description: 'Includes CSS for all the included components'
    },
    {
      folder: 'src/functions',
      description: 'Includes helpers and functions used in the template'
    },
    {
      folder: 'src/json',
      description:
        'Includes sample json files with data used in some views and components'
    },
    {
      folder: 'src/reducers',
      description: 'Includes redux reducers used in the app'
    },
    {
      folder: 'src/reducers/navigation',
      description:
        'Includes menus and navigation files that are used in the left sidebar and top navigation components'
    },
    {folder: 'src/pages', description: 'Includes all pages and sample views'},
    {
      folder: 'public',
      description:
        'Includes all the static assets and content used in the template'
    }
  ]
  return (
    <div className="mb-8">
      <SectionTitle
        title="Folders"
        subtitle="Important folders in the template"
      />
      <ol className="list-disc pl-6">
        {items.map((folder, i) => (
          <li className="mb-2" key={i}>
            <p className="mb-2">
              <code>{folder.folder}</code>
            </p>
            <p className="mb-2">{folder.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export const Files = () => {
  const filenames = [
    {
      filename: 'src/reducers/index.js',
      description: 'Redux config and global store'
    },
    {
      filename: 'tailwind.config.js',
      description: 'Tailwind CSS default configuration'
    },
    {
      filename: 'craco.config.js',
      description:
        'CRACO config overrides. This allows for custom react-scripts overrides without modifying the original files'
    },
    {filename: 'src/pages/index.js', description: 'Template index file'},
    {filename: 'src/pages/App.js', description: 'Template entry page'},
    {
      filename: 'src/pages/Routes.js',
      description: 'Template routes are defined here'
    },
    {
      filename: 'postcss.config.js',
      description: 'PostCSS configuration for plugins used in the template'
    },
    {
      filename: 'src/css/_components.css',
      description: 'CSS files for components are imported here'
    },
    {
      filename: 'src/css/_layouts.css',
      description: 'CSS files for layouts are imported here'
    }
  ]
  return (
    <div className="mb-8">
      <SectionTitle title="Files" subtitle="Important files in the template" />
      <ol className="list-disc pl-6">
        {filenames.map((filename, i) => (
          <li className="mb-2" key={i}>
            <p className="mb-2">
              <code>{filename.filename}</code>
            </p>
            <p className="mb-2">{filename.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
