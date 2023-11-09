import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import countries from '../json/countries.json'
import {formatNumber} from '../functions/numbers'

const fields = [
  {
    name: 'Code',
    key: 'alpha3Code'
  },
  {
    name: 'Name',
    key: 'name'
  },
  {
    name: 'Native name',
    key: 'nativeName'
  },
  {
    name: 'Capital',
    key: 'capital'
  },
  {
    name: 'Population',
    key: 'population'
  }
]

const DefaultTables = () => {
  let items = countries
    .filter((country) => country.region === 'Europe')
    .map((country) => {
      country['population'] = formatNumber(country['population'])
      return country
    })
  return (
    <>
      <SectionTitle title="Tables" subtitle="Default tables" />

      <Widget
        title="Default table"
        description={
          <span>
            Use the <code>.table</code> className for simple tables
          </span>
        }>
        <table className="table">
          <thead>
            <tr>
              {fields.map((field, i) => (
                <th key={i}>{field.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 8).map((country, i) => (
              <tr key={i}>
                {fields.map((field, j) => (
                  <td key={j}>{country[field.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>

      <Widget
        title="Default table"
        description={
          <span>
            Use the <code>.table-lg</code> className for larger tables
          </span>
        }>
        <table className="table table-lg">
          <thead>
            <tr>
              {fields.map((field, i) => (
                <th key={i}>{field.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 8).map((country, i) => (
              <tr key={i}>
                {fields.map((field, j) => (
                  <td key={j}>{country[field.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>

      <Widget
        title="Default table"
        description={
          <span>
            Use the <code>.no-border</code> className to remove borders
          </span>
        }>
        <table className="table no-border">
          <thead>
            <tr>
              {fields.map((field, i) => (
                <th key={i}>{field.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 8).map((country, i) => (
              <tr key={i}>
                {fields.map((field, j) => (
                  <td key={j}>{country[field.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>

      <Widget
        title="Default table"
        description={
          <span>
            Use the <code>.striped</code> className for striped tables
          </span>
        }>
        <table className="table no-border striped">
          <thead>
            <tr>
              {fields.map((field, i) => (
                <th key={i}>{field.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 8).map((country, i) => (
              <tr key={i}>
                {fields.map((field, j) => (
                  <td key={j}>{country[field.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>
    </>
  )
}
export default DefaultTables
