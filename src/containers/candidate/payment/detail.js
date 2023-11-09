import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router'
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import {FiCheck} from 'react-icons/fi'
import Switch from 'react-switch'
import { 
  Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import { NotificationManager } from 'react-notifications';

import SectionTitle from '../../../components/section-title'
import Widget from '../../../components/widget'
import {get as getPrice} from '../../../api/priceCandidate'
import {getFilter as getCoupons, remove as removeCoupon} from '../../../api/couponCandidate'
import {update as updateProfile} from '../../../api/profile'
import {useStyles} from '../../style/common'
import {getColor} from '../../../functions/colors'
import {setCookie} from '../../../functions/cookie'
import {useSetting} from '../../../provider/setting'
import { useAsync } from '../../../functions/utils'
import {UnderlinedTabs} from '../../../components/tabs'
import Coupon from '../../../components/payment/coupon'
import Stripe from '../../../components/payment/stripe'
import Razorpay from '../../../components/payment/razorpay'
import Description from './description'

const stripePromise = loadStripe("pk_test_51IuCHsSJhHkg9TM3mBxgOTPBephq2HUXixuO9SmoExa7Jx1A0yuVwCpPTaNSmaCu0kjq09DxTGmosCeqTh0tG95N00jbOadb5E");
const Payment = (props) => {
  const {title, price, result} = props
  const tabs = [
    {
      index: 0,
      title: 'Stripe',
      content: (
        <div className="py-4 w-full">
          <Stripe title={title} price={price} result={result} />
        </div>
      )
    },
    {
      index: 1,
      title: 'Razorpay',
      content: (
        <div className="py-4 w-full">
          <Razorpay title={title} price={price} result={result} />
        </div>
      )
    }
  ]

  return (
    <>
      <UnderlinedTabs tabs={tabs} />
    </>
  )
}
const PricingTable = (props) => {
  const {price, newPrice, oldPrice, discount} = props

  return (
    <div className="w-full flex flex-col items-center justify-end mb-8 lg:mb-0">
      <div className="flex flex-row items-center justify-center h-16">
        <span className="text-lg text-grey-500">&#x20b9;</span>
        <span className="text-4xl text-blue-500">{newPrice}</span>
        {discount !== 0 &&
          <>
            <span className="text-lg text-grey-300 pl-4">&#x20b9;</span>
            <s style={{color: 'gray'}}>
              <span className="text-3xl text-grey-300">{oldPrice}</span>
            </s>
          </>
        }
      </div>
      <div className="flex flex-row items-center justify-center h-16 uppercase font-bold text-base">
        {price?.name}
      </div>
      <>
        <div className="flex flex-row w-full items-center justify-start h-10">
          <div className="flex-shrink-0 w-8">
            <FiCheck
              className={`stroke-current stroke-2 text-base text-green-500`}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="text-sm">{price?.month} months validity</div>
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-start h-10">
          <div className="flex-shrink-0 w-8">
            <FiCheck
              className={`stroke-current stroke-2 text-base text-green-500`}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="text-sm">{price?.train} training exams and detailed result</div>
          </div>
        </div>
        {price?.details?.map((item, i) => (
          <div className="flex flex-row w-full items-center justify-start h-10" key={i}>
            <div className="flex-shrink-0 w-8">
              <FiCheck
                className={`stroke-current stroke-2 text-base text-green-500`}
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">{item}</div>
            </div>
          </div>
        ))}
      </>
    </div>
  )
}
const PaymentDetail = () => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const {id} = useParams()
  const history = useHistory()
  const [setting, dispatch] = useSetting()
  const [isCoupon, setIsCoupon] = useState(false)
  const [price, setPrice] = useState({})
  const [newPrice, setNewPrice] = useState('')
  const [oldPrice, setOldPrice] = useState('')
  const [discount, setDiscount] = useState(0)
  const [pending, setPending] = useState(false)
  const [asyncState, setAsyncState] = useState('')
  let onColor = `bg-blue-200`
  let onHandleColor = `bg-blue-500`
  let offColor = `bg-grey-200`
  let offHandleColor = 'bg-white'
  
  const paymentResult = (res) => {
    if (res) {
      let premiumDate = new Date()
      premiumDate.setMonth(premiumDate.getMonth() + price?.month)
      let tmp = {}
      tmp.id = setting?.auth?.profileID
      tmp.trainNumber = price?.train
      tmp.premiumDate = premiumDate
      run(updateProfile(tmp))
      setAsyncState('createPayment')
      NotificationManager.success('Payment Success', 'Success', 3000);
    }
  }
  const couponResult = (res) => {
    if (res.isFree) {
      let premiumDate = new Date()
      premiumDate.setMonth(premiumDate.getMonth() + price?.month)
      let tmp = {}
      tmp.id = setting?.auth?.profileID
      tmp.trainNumber = price?.train
      tmp.premiumDate = premiumDate
      run(updateProfile(tmp))
      setAsyncState('createPayment')
    }
    else {
      setDiscount(res.discount)
      setIsCoupon(false)
      setNewPrice(Math.ceil(oldPrice * (100 - parseFloat(res.discount))/100))
    }
  }

  useEffect(() => {
    run(getPrice(id))
    setAsyncState('getPrice')
    setPending(true)
  }, [run])
  useEffect(() => {
    if (status === 'resolved') {
      if (asyncState === 'getPrice') {
        setPrice(data)
        setNewPrice(data?.price)
        setOldPrice(data?.price)
        setPending(false)
        setAsyncState('')
      }
      else if (asyncState === 'createPayment') {
        let tmp = setting?.auth
        tmp.profile = data
        dispatch({type: 'SET', settingName: 'auth', settingData: tmp})
        setCookie('auth', JSON.stringify(tmp), 1)
        NotificationManager.success('Premium is updated successfully.', 'Success', 3000);
        setAsyncState('')
        history.push(`${process.env.PUBLIC_URL}/dashboard`)
      }
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
      <SectionTitle title="Payment Detail" subtitle="Payment Detail" />
      <Widget
        title=""
        description={
          <span>
            Membership ({price?.name})
          </span>
        }>
        <Description />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 p-2">
            <PricingTable price={price} newPrice={newPrice} oldPrice={oldPrice} discount={discount} />
          </div>
          <div className="w-full lg:w-2/4 p-2">
            <div className="w-full flex flex-row items-center justify-center space-x-2 pt-12">
              <Switch
                onChange={() => {
                  setIsCoupon(!isCoupon)
                }}
                checked={isCoupon}
                onColor={getColor(onColor)}
                onHandleColor={getColor(onHandleColor)}
                offColor={getColor(offColor)}
                offHandleColor={getColor(offHandleColor)}
                handleDiameter={24}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
                activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
              />
              <span className="font-bold text-base">{isCoupon ? 'Coupon' : 'Payment'}</span>
            </div>
            {isCoupon?
            <Coupon priceId={id} result={couponResult} get={getCoupons} remove={removeCoupon} />:
            (
              <Elements stripe={stripePromise}>
                <Payment title={`${price?.name} of candidate`} price={newPrice} result={paymentResult} />
              </Elements>
            )
            }
          </div>
        </div>
      </Widget>
    </>
  )
}
export default PaymentDetail
