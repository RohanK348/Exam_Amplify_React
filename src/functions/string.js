const getRandomString = (length) => {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

const getFileExtension = (filename) => {
  var re = /(?:\.([^.]+))?$/
  var ext = re.exec(filename)[1]
  return ext
}

const isEmail = (email) => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

const getJson = (string) => {
  let res = null
  if (string !== '') {
    res = JSON.parse(string)
  }
  return res
}

const isNumeric = (str) => {
  return !isNaN(str)
}

const isPhoneNumber = (str) => {
  const mask = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  var isphone = mask.test(str)
  return isphone
}

const formatYmd = (date) => {
  return date.toISOString().slice(0, 10)
}

const getMonth = (month) => {
  const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  return mlist[month-1]
}

const N2SW0 = (value) => {
  if (value >= 0 && value < 10) {
    return `0${value}`
  }
  else 
    return `${value}`
}

export {
  getRandomString,
  getFileExtension,
  isEmail,
  isNumeric,
  isPhoneNumber,
  getJson,
  formatYmd,
  getMonth,
  N2SW0,
}