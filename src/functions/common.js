function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function isEmptyObject(obj) {
  var keys = [];
  for(var key in obj){
    keys.push(key);
  }
  return keys.length === 0;
}

function propertyNumber(obj) {
  var keys = [];
  for(var key in obj){
    keys.push(key);
  }
  return keys.length
}

function removeNullProperty(inObj) {
  const res = Object.keys(inObj)
  .filter(key => inObj[key]!== null)
  .reduce((obj, key) => {
    obj[key] = inObj[key];
    return obj;
  }, {});
  return res
}

function getSplitArray(inputArray, perChunk) {
  let res = inputArray.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
  
    resultArray[chunkIndex].push(item)
  
    return resultArray
  }, [])
  return res
}

function convertImgToBase64URL(url, callback, outputFormat){
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
      var canvas = document.createElement('CANVAS'),
      ctx = canvas.getContext('2d'), dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null; 
  };
  img.src = url;
}

export {
  sleep,
  isEmptyObject,
  propertyNumber,
  getSplitArray,
  convertImgToBase64URL,
  removeNullProperty,
}