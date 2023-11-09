import React from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import '../../../css/components/maps/leaflet-maps.css'

export const BasicMap = ({lat, lng, zoom}) => {
  const position = [lat, lng]

  return (
    <Map center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  )
}

