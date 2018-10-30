function DateTimeToDate(datetime) {
  let year = datetime.getFullYear()
  let month = datetime.getMonth() + 1
  let day = datetime.getDate()

  return year + '-' + month + '-' + day
}

module.exports = {
  DateTimeToDate: DateTimeToDate
}