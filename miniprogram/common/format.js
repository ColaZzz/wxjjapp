function getMMdd(d) {
  let date = d.split(' ')[0]
  date = date.substr(5)

  return date
}

module.exports = {
  getMMdd: getMMdd
}