#!/usr/bin/env node

const fs = require('fs')
const csv = require('csv')
const _ = require('lodash')
const gender = require('gender-guess')

const emails = {}
var count = 0
process.argv.slice(2).forEach((file, i) => {
  fs.createReadStream(file)
    .pipe(csv.parse({ columns: true }))
    .pipe(csv.transform((record) => {
      var email = record['Ticket Email']
      var emailDigest = emails[email] = emails[email] || count++
      var month = record.Event.match(/WaffleJS \((.*)\)/)[1].substring(0, 3)
      var guess = gender.guess(record['Ticket First Name'])
      return _(record)
        .pick([
          'Ticket Created Date',
          'Ticket Last Updated Date',
          'Ticket',
          'Ticket Company Name',
          'Event',
          'Void',
          'Price',
          'Tags',
          'Order Created Date',
          'Order Completed Date',
        ])
        .merge({
          'Event Month': month,
          'Ticket Gender Guess': guess && guess.gender,
          'Ticket Email Digest': emailDigest,
        })
        .value()
    }))
    .pipe(csv.stringify({ header: i === 0 }))
    .pipe(process.stdout)
})
