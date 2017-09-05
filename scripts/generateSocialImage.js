#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const moment = require('moment')
const generateImage = require('typesetters-son')

const calendarText = fs.readFileSync(path.join(__dirname, '../models/calendar.yml'))
const calendarData = yaml.safeLoad(calendarText, 'utf8')

calendarData.reverse()
const now = moment()
const nextEvent = calendarData.find(event => moment(event.day).isAfter(now))
const dateText = moment(nextEvent.day).format('dddd, MMMM D')
generateImage({
  url: `file:${path.join(__dirname, '../images/social.svg')}`,
  output: `${path.join(__dirname, '../images/social.jpg')}`,
  width: 1200,
  height: 630,
  subs: {
    '#date': `${dateText} at 7 PM`,
  },
})
  .catch(err => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
