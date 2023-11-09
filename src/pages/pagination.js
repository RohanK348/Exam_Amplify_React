import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {Pagination} from '../components/pagination'
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiArrowLeft,
  FiChevronRight,
  FiChevronsRight,
  FiArrowRight
} from 'react-icons/fi'

const Index = () => (
  <>
    <SectionTitle title="UI Elements" subtitle="Pagination" />
    <Widget
      title="Pagination"
      description={
        <span>
          Use the <code>&lt;Pagination /&gt;</code> component for pagination
          with numbers and text labels
        </span>
      }>
      <Pagination
        onClick={() => null}
        items={Array.from(Array(10).keys())}
        active={5}
        previous="Previous"
        next="Next"
      />
    </Widget>
    <Widget
      title="Custom icons"
      description={
        <span>
          Use any component or text for the <code>previous</code> and{' '}
          <code>next</code> props
        </span>
      }>
      <div className="w-full flex flex-col space-y-4">
        <Pagination
          onClick={() => null}
          items={Array.from(Array(10).keys())}
          active={5}
          icons={true}
          previous={<FiChevronLeft size={16} className="stroke-current" />}
          next={<FiChevronRight size={16} className="stroke-current" />}
        />
        <Pagination
          onClick={() => null}
          items={Array.from(Array(10).keys())}
          active={5}
          icons={true}
          previous={<FiChevronsLeft size={16} className="stroke-current" />}
          next={<FiChevronsRight size={16} className="stroke-current" />}
        />
        <Pagination
          onClick={() => null}
          items={Array.from(Array(10).keys())}
          active={5}
          icons={true}
          previous={<FiArrowLeft size={16} className="stroke-current" />}
          next={<FiArrowRight size={16} className="stroke-current" />}
        />
      </div>
    </Widget>
  </>
)
export default Index
