import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {
  TextInput,
  InvalidTextInput,
  ValidTextInput
} from '../components/forms/text-inputs'
import {Select, InvalidSelect, ValidSelect} from '../components/forms/selects'
import {Radio, InvalidRadio, ValidRadio} from '../components/forms/radios'
import {
  Checkbox,
  InvalidCheckbox,
  ValidCheckbox
} from '../components/forms/checkboxes'

const Index = () => (
  <>
    <SectionTitle title="Forms" subtitle="Inputs" />

    <Widget title="Regular" description={<span>Text inputs</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
        <div className="w-full lg:w-1/4">
          <TextInput />
        </div>
        <div className="w-full lg:w-1/4">
          <InvalidTextInput />
        </div>
        <div className="w-full lg:w-1/4">
          <ValidTextInput />
        </div>
      </div>
    </Widget>

    <Widget title="Inline" description={<span>Inline text inputs</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:w-1/2">
        <div className="w-full mb-4">
          <TextInput inline={true} />
        </div>
        <div className="w-full mb-4">
          <InvalidTextInput inline={true} />
        </div>
        <div className="w-full mb-4">
          <ValidTextInput inline={true} />
        </div>
      </div>
    </Widget>

    <Widget title="Selects" description={<span>Select inputs</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
        <div className="w-full lg:w-1/4">
          <Select />
        </div>
        <div className="w-full lg:w-1/4">
          <InvalidSelect />
        </div>
        <div className="w-full lg:w-1/4">
          <ValidSelect />
        </div>
      </div>
    </Widget>

    <Widget
      title="Inline Selects"
      description={<span>Inline select inputs</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:w-1/2">
        <div className="w-full mb-4">
          <Select inline={true} />
        </div>

        <div className="w-full mb-4">
          <InvalidSelect inline={true} />
        </div>

        <div className="w-full mb-4">
          <ValidSelect inline={true} />
        </div>
      </div>
    </Widget>

    <Widget title="Radios" description={<span>Default components</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full">
        <div className="w-full mb-4">
          <Radio />
        </div>
        <div className="w-full mb-4">
          <InvalidRadio />
        </div>
        <div className="w-full mb-4">
          <ValidRadio />
        </div>
      </div>
    </Widget>

    <Widget
      title="Inline radios"
      description={<span>Inline radio inputs</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:w-1/2">
        <div className="w-full mb-4">
          <Radio inline={true} />
        </div>
        <div className="w-full mb-4">
          <InvalidRadio inline={true} />
        </div>
        <div className="w-full mb-4">
          <ValidRadio inline={true} />
        </div>
      </div>
    </Widget>

    <Widget title="Checkboxes" description={<span>Default components</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full">
        <div className="w-full mb-4">
          <Checkbox />
        </div>
        <div className="w-full mb-4">
          <InvalidCheckbox />
        </div>
        <div className="w-full mb-4">
          <ValidCheckbox />
        </div>
      </div>
    </Widget>

    <Widget
      title="Inline checkboxes"
      description={<span>Inline checkbox inputs</span>}>
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:w-1/2">
        <div className="w-full mb-4">
          <Checkbox inline={true} />
        </div>
        <div className="w-full mb-4">
          <InvalidCheckbox inline={true} />
        </div>
        <div className="w-full mb-4">
          <ValidCheckbox inline={true} />
        </div>
      </div>
    </Widget>
  </>
)
export default Index
