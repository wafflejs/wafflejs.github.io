#!/usr/bin/env node

const fs = require('fs')
const csv = require('csv')
const merge = require('lodash/object/merge')
const pick = require('lodash/object/pick')
const gender = require('gender-guess')

process.argv.slice(2).forEach(function(file, i) {
  fs.createReadStream(file)
    .pipe(csv.parse({ columns: true }))
    .pipe(csv.transform(function(record) {
      var guess = gender.guess(record['Ticket First Name'])
      return merge(pick(record, [
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
      ]), {
        'Ticket Gender Guess': guess && guess.gender
      })
    }))
    .pipe(csv.stringify({ header: i === 0 }))
    .pipe(process.stdout)
})
