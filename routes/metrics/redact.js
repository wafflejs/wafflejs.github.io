#!/usr/bin/env node
'use strict'

const fs = require('fs')
const csv = require('csv')
const _ = require('lodash')
const gender = require('gender-guess')

const emails = {}
let count = 0
process.argv.slice(2).forEach((file, i) => {
  fs.createReadStream(file)
    .pipe(csv.parse({ columns: true }))
    .pipe(csv.transform((record) => {
      const email = record['Ticket Email']
      const emailDigest = emails[email] = emails[email] || count++
      const month = record.Event.match(/WaffleJS \((.*)\)/)[1].substring(0, 3)
      const guess = gender.guess(record['Ticket First Name'])
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
