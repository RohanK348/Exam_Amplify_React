import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)


async function signout() {
  try {
    await Auth.signOut()
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function confirm({email, code}) {
  try {
    await Auth.confirmSignUp(email, code);
  } catch(error) {
    return Promise.reject(error)
  }
}

async function reSendConfirmCode(email) {
  try {
    await Auth.resendSignUp(email);
  } catch(error) {
    return Promise.reject(error)
  }
}

async function forgetPassword(email) {
  try {
    await Auth.forgotPassword(email);
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function confirmNewPassword(email, code, password) {
  try {
    await Auth.forgotPasswordSubmit(email, code, password);
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function changePassword(oldPassword, newPassword) {
  try {
    const user = await Auth.currentAuthenticatedUser()
    await Auth.changePassword(user, oldPassword, newPassword);
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  signup,
  signin,
  signout,
  confirm,
  reSendConfirmCode,
  forgetPassword,
  confirmNewPassword,
  changePassword,
}
