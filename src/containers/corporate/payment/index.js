import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {useAsync} from '../../../functions/utils'
import {getAll as getPrices} from '../../../api/priceCorporate'
import {useStyles} from '../../style/common'
import Description from './description'
const PricingTable = (props) => {
  const {price} = props
  const classes = useStyles()

  return (
    <div className="w-full flex flex-col items-center justify-end mb-8 lg:mb-0">
      <div className="flex flex-row items-center justify-center h-16">
        <span className="text-lg text-grey-500">&#x20b9;</span>
        <span className="text-4xl text-blue-500">{price?.price}</span>
      </div>
      <div className="flex flex-row items-center justify-center h-16 uppercase font-bold text-base">
        {price?.name}
      </div>
      <div className="text-2xl text-grey-500 pt-12">
        {price?.number}
      </div>
      <div className="text-2xl text-grey-500 pb-12">Candidates</div>
      <div className="flex flex-row w-full items-center justify-center mt-8">
        <Link to={`/corporate/payment/${price.id}`} style={{textDecoration: 'none'}}>
          <button className={classes.button} style={{float: 'right'}}>Select</button>
        </Link>
      </div>
    </div>
  )
}
const Payment = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [prices, setPrices] = useState([])
  const [pending, setPending] = useState(false)
  
  useEffect(() => {
    run(getPrices())
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      setPrices(data)
      setPending(false)
    }
    else if (status === 'rejected') {
      console.log(error)
      setPending(false)
    }
  }, [status])
  return (
    <>
      <Backdrop className={classes.backdrop} open={pending} style={{zIndex: 9999}}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SectionTitle title="Payment" subtitle="Payment" />
      <Widget
        title=""
        description={
          <span>
            Membership
          </span>
        }>
        <Description />
        <div className="flex flex-col lg:flex-row">
          {prices.map((item, id) => (
            <div className="w-full lg:w-1/4 p-2" key={id}>
              <PricingTable price={item} />
            </div>
          ))}
        </div>
      </Widget>
    </>
  )
}
export default Payment
