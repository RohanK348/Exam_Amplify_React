import Amplify, { API } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

async function paymentIntent(data) {
  try {
    const apiName = "examApi"
    const path = "/stripeIntent"
    const myInit = {
      body: { data: data },
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `${(await Auth.currentSession())
      //     .getAccessToken()
      //     .getJwtToken()}`,
      // },
    };
    const result = await API.post(apiName, path, myInit)
    return Promise.resolve({data: result})
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  paymentIntent,
}