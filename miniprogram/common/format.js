const app = getApp()
var estateUrl = app.estateUrl
var articleUrl = app.articleUrl

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
    if (arr[i].flag == 0) {
      arr[i].img_url = articleUrl + arr[i].img_url
    } else if (arr[i].flag == 1) {
      arr[i].img_url = estateUrl + arr[i].img_url
    }
  }
  return arr
}


module.exports = {
  getMMdd,
  getyyyyMMdd,
  imgPrefix
}