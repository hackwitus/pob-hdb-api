const rp = require('request-promise-native')
const uuidv1 = require('uuid/v1')
const moment = require('moment')
require('dotenv').config()

module.exports.request = function ({ options }) {
  return rp({
    method: 'POST',
    url: process.env.HDB_URL,
    headers: {
      "content-type":"application/json",
      "authorization": 'Basic ' + new Buffer(process.env.HDB_USERNAME + ':' + process.env.HDB_PASSWORD).toString('base64')
    },
    body: options,
    json: true
  })
}

module.exports.getID = function() {
  return uuidv1()
}

module.exports.getDate = function() {
  return moment().format()
}