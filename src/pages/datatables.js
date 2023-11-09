import React from 'react'
import SectionTitle from '../components/section-title'
import Datatable from '../components/datatable'
import countries from '../json/countries.json'
import Widget from '../components/widget'
import {formatNumber} from '../functions/numbers'

const Simple = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Code',
        accessor: 'alpha3Code'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Capital',
        accessor: 'capital'
      },
      {
        Header: 'Region',
        accessor: 'region'
      },
      {
        Header: 'Population',
        accessor: 'population',
        Cell: (props) => <span>{formatNumber(props.value)}</span>
      }
    ],
    []
  )
  const data = React.useMemo(() => countries, [])
  return <Datatable columns={columns} data={data} />
}

const Index = () => (
  <>
    <SectionTitle title="Tables" subtitle="Datatables" />
    <Widget
      title="Datatable example"
      description={
        <span>
          Use the <code>&lt;Datatable /&gt;</code> component to create a data
          table
        </span>
      }>
      <Simple />
    </Widget>
  </>
)
export default Index
