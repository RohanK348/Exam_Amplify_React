import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import {BasicMap} from '../components/maps/leaflet-maps'

const Index = () => (
  <>
    <SectionTitle title="Maps" subtitle="Leaflet maps" />
    <Widget
      title="Default colors"
      description={
        <span>
          Use the <code>&lt;BasicMap /&gt;</code> component to generate a simple
          map
        </span>
      }>
      <BasicMap lat={51.505} lng={-0.09} zoom={12} />
    </Widget>

    <Widget
      title="Grayscale maps"
      description={
        <span>
          Wrap the <code>&lt;BasicMap&gt;</code> component with the{' '}
          <code>.leaflet-grayscale</code> className for grayscale maps
        </span>
      }>
      <div className="leaflet-grayscale">
        <BasicMap lat={51.505} lng={-0.09} zoom={12} />
      </div>
    </Widget>
  </>
)
export default Index
