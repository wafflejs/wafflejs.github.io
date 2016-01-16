#!/usr/bin/env node

const fs = require('fs')
const csv = require('csv')
const pick = require('lodash/object/pick')

process.argv.slice(2).forEach(function(file, i) {
  fs.createReadStream(file)
    .pipe(csv.parse({ columns: true }))
    .pipe(csv.transform(function(record) {
      return pick(record, [
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
    }))
    .pipe(csv.stringify({ header: i === 0 }))
    .pipe(process.stdout)
})
