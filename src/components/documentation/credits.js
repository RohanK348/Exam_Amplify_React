import React from 'react'
import SectionTitle from '../section-title'

export const Credits = () => {
  const items = [
    {
      title: 'React',
      description: 'A JavaScript library for building user interfaces',
      url: 'https://reactjs.org/'
    },
    {
      title: 'Create React App',
      description: 'Set up a modern web app by running one command',
      url: 'https://create-react-app.dev/'
    },
    {
      title: 'Tailwind CSS',
      description:
        'A utility-first CSS framework for rapidly building custom designs',
      url: 'https://tailwindcss.com/'
    },
    {
      title: 'Animate.css',
      description:
        'Just-add-water CSS animations',
      url: 'https://animate.style'
    },
    {
      title: 'Redux',
      description: 'A Predictable State Container for JS Apps',
      url: 'https://redux.js.org/'
    },
    {
      title: 'React Redux',
      description: 'Official React bindings for Redux',
      url: 'https://react-redux.js.org/'
    },
    {
      title: 'Google fonts',
      description:
        'Making the web more beautiful, fast, and open through great typography',

      url: 'https://fonts.google.com/'
    },
    {
      title: 'Craco',
      description:
        'Create React App Configuration Override is an easy and comprehensible configuration layer for create-react-app',
      url: 'https://github.com/gsoft-inc/craco'
    },
    {
      title: 'Unsplash',
      description: 'Free (do whatever you want) high-resolution photos',
      url: 'https://unsplash.com/'
    },
    {
      title: 'faker.js',
      description: 'faker.js - generate massive amounts of fake data in the browser and node.js',
      url: 'https://github.com/marak/Faker.js/'
    },
    {
      title: 'React Icons',
      description:
        'Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.',
      url: 'https://react-icons.github.io/react-icons/'
    },
    {
      title: 'flag-icon-css',
      description:
        'A collection of all country flags in SVG plus the CSS for easier integration.',
      url: 'http://flag-icon-css.lip.is/'
    },
    {
      title: 'DataMaps',
      description:
        'Customizable SVG map visualizations for the web in a single Javascript file using D3.js',
      url: 'http://datamaps.github.io/'
    },
    {
      title: 'Chart.js',
      description:
        'Simple yet flexible JavaScript charting for designers & developers',
      url: 'https://www.chartjs.org/'
    },
    {
      title: 'rc-slider',
      description: 'Slider UI component for React',
      url: 'https://github.com/react-component/slider/'
    },
    {
      title: 'React Select',
      description:
        'A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.',
      url: 'https://react-select.com/home'
    },
    {
      title: 'Recharts',
      description: 'A composable charting library built on React components',
      url: 'http://recharts.org/en-US/'
    },
    {
      title: 'react-switch',
      description: 'A draggable toggle-switch component for React.',
      url: 'https://www.npmjs.com/package/react-switch'
    },
    {
      title: 'tailwindcss-dark-mode',
      description: 'Tailwind CSS Dark Mode Plugin',
      url: 'https://github.com/ChanceArthur/tailwindcss-dark-mode'
    },
    {
      title: 'Tailwind CSS Custom Forms',
      description:
        'Out of the box, selects, checkboxes, and radios look awful in Tailwind and the only way to make them look better is with custom CSS.',
      url: 'https://github.com/tailwindcss/custom-forms'
    },
    {
      title: 'accounting.js',
      description:
        'accounting.js is a tiny JavaScript library by Open Exchange Rates, providing simple and advanced number, money and currency formatting.',
      url: 'http://openexchangerates.github.io/accounting.js/'
    },
    {
      title: 'Leaflet',
      description:
        'An open-source JavaScript library for mobile-friendly interactive maps',
      url: 'https://leafletjs.com/'
    },
    {
      title: 'Popper',
      description: 'Tooltip & Popover positioning engine',
      url: 'https://popper.js.org/'
    },
    {
      title: 'react-beautiful-dnd',
      description:
        'Beautiful and accessible drag and drop for lists with React',
      url: 'https://github.com/atlassian/react-beautiful-dnd'
    },
    {
      title: 'react-dropzone',
      description:
        "Simple React hook to create a HTML5-compliant drag'n'drop zone for files.",
      url: 'https://github.com/react-dropzone/react-dropzone'
    },
    {
      title: 'react-datetime',
      description:
        "A date and time picker in the same React.js component. It can be used as a datepicker, timepicker or both at the same time. It is highly customizable and it even allows to edit date's milliseconds.",
      url: 'https://github.com/YouCanBookMe/react-datetime'
    },
    {
      title: 'react-notifications',
      description: 'React Notifications',
      url: 'https://github.com/tjrexer/react-notifications'
    },
    {
      title: 'ReactQuill',
      description: 'A Quill component for React.',
      url: 'https://github.com/zenoamaro/react-quill'
    },
    {
      title: 'React Hook Form',
      description:
        'Performant, flexible and extensible forms with easy-to-use validation.',
      url: 'https://react-hook-form.com/'
    },
    {
      title: 'GetTerms.io',
      description: 'Privacy Policy Generator',
      url: 'https://getterms.io/'
    },
    {
      title: 'react-circle',
      description: 'Renders a svg circle + percentage. It just works',
      url: 'https://github.com/zzarcon/react-circle'
    }
  ]

  return (
    <div className="mb-8">
      <SectionTitle
        title="Credits"
        subtitle="Frameworks, scripts and dependencies used in the template"
      />
      <div className="flex">
        <div className="w-full">
          <ol className="list-disc pl-6">
            {items.map((item, i) => (
              <li key={i} className="mb-4">
                <div className="mb-2 font-bold font-sans font-base">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </div>
                <p className="mb-2 leading-7">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
