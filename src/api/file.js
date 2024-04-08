import Amplify, { Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

async function upload(file, filename) {
  try {
    const result = await Storage.put(filename, file);
    return Promise.resolve({data: result})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function download(fileKey) {
  const result = await Storage.get(fileKey, { download: true });
  downloadBlob(result.Body, fileKey);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
}

export {
  upload,
  getUrl,
  download,
}