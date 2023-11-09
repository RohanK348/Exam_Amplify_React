import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'

const sizes = ['h-8', 'h-16', 'h-20', 'h-24', 'h-32']
const outlines = [
  'shadow-outline',
  'shadow-outline-green',
  'shadow-outline-red',
  'shadow-outline-black',
  'shadow-outline-white'
]
const Images = () => (
  <>
    <SectionTitle title="UI Elements" subtitle="Images" />
    <Widget
      title="Rounded images"
      description={
        <span>
          Use the <code>.rounded</code> class for rounded images
        </span>
      }>
      <div className="flex flex-wrap justify-start items-start">
        {sizes.map((size, i) => (
          <img
            key={i}
            src="/27.png"
            alt="media"
            className={`${size} rounded max-w-full mr-2 mb-2`}
          />
        ))}
      </div>
    </Widget>

    <Widget
      title="Circular images"
      description={
        <span>
          Use the <code>.rounded-full</code> class for circular images
        </span>
      }>
      <div className="flex flex-wrap justify-start items-start">
        {sizes.map((size, i) => (
          <img
            key={i}
            src="/27.png"
            alt="media"
            className={`${size} rounded-full max-w-full mr-2 mb-2`}
          />
        ))}
      </div>
    </Widget>

    <Widget
      title="Raised images"
      description={
        <span>
          Use the <code>.shadow-lg</code> class for raised images
        </span>
      }>
      <div className="flex flex-wrap justify-start items-start">
        {sizes.map((size, i) => (
          <img
            key={i}
            src="/27.png"
            alt="media"
            className={`${size} rounded-full max-w-full shadow-lg mr-2 mb-2`}
          />
        ))}
      </div>
    </Widget>

    <Widget
      title="Bordered images"
      description={
        <span>
          Use the <code>.shadow-outline-color</code> classNames to add an inner
          border to your images
        </span>
      }>
      <div className="flex flex-wrap justify-start items-start">
        {outlines.map((outline, i) => (
          <img
            key={i}
            src="/27.png"
            alt="media"
            className={`h-16 rounded-full max-w-full mr-2 mb-2 ${outline}`}
          />
        ))}
      </div>
    </Widget>
  </>
)
export default Images
