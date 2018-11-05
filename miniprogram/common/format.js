const app = getApp()
var prefix = app.estateImgPrefix

function getMMdd(d) {
  let date = d.split(' ')[0]
  date = date.substr(5)

  return date
}

function imgPrefix(arr){
  for(let i=0;i<arr.length;i++){
    let str = arr[i].img_url.substr(0, 4)
    if(str != 'http'){
      arr[i].img_url = prefix + arr[i].img_url
    }
  }
}

function imgPrefixForObj(arr) {
    let str = arr.img_url.substr(0, 4)
    debugger
    if (str != 'http') {
      arr.img_url = prefix + arr.img_url
    }
}

module.exports = {
  getMMdd: getMMdd,
  imgPrefix: imgPrefix,
  imgPrefixForObj: imgPrefixForObj
}