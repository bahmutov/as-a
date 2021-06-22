console.log('in %s', __filename)
if (process.env.MY_VARIABLE !== '42') {
  throw new Error('Missing MY_VARIABLE')
}
