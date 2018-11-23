const app = getApp()
var imgUrl = app.imgUrl
var imgUrl = app.imgUrl

function getMMdd(d) {
  let date = d.split(' ')[0]
  date = date.substr(5)

  return date
}

function getyyyyMMdd(d) {
  let date = d.split(' ')[0]

  return date
}

function imgPrefix(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].img_url = imgUrl + arr[i].img_url
  }
  return arr
}


module.exports = {
  getMMdd,
  getyyyyMMdd,
  imgPrefix
}