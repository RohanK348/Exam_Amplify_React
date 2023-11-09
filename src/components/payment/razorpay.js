import React, {useEffect} from 'react'
import { NotificationManager } from 'react-notifications'
import { makeStyles } from '@material-ui/core/styles'

import { useAsync } from '../../functions/utils'
import {useSetting} from '../../provider/setting'
import {createOrder} from '../../api/razorpay'

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    fontSize: 15,
    color: 'white',
    backgroundColor: '#1A2245',
    padding: '8px 20px',
    borderRadius: 5,
  },
}))
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Razorpay = (props) => {
  const {data, status, error, run} = useAsync({
    status: 'idle',
  })
  const classes = useStyles()
  const [setting] = useSetting()
  const {title, price, result} = props

  const handlePay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    run(createOrder({
      amount: price * 100, 
      currency: 'INR',
    }))
  }

  useEffect(() => {
    if (status === 'resolved') {
      console.log(data)
      const options = {
        key: "rzp_test_25fnOwAJlpuga5",
        currency: 'INR',
        amount: price * 100,
        order_id: data.id,
        name: title,
        description: `${title} by ${setting?.auth?.email}`,
        handler: function (response) {
          result(true)
        },
        prefill: {
          name: setting?.auth?.name,
          email: setting?.auth?.email,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    else if (status === 'rejected') {
      console.log(error)
      NotificationManager.warning('Payment Error', 'Error', 3000);
    }
  }, [status])
  return (
    <div className="flex justify-center pt-20">
      <button className={classes.button} onClick={handlePay}>Payment (<span>&#x20b9;</span> {price})</button>
    </div>
  )
}
export default Razorpay
