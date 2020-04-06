/* eslint-env node */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const moment = require('moment')
const puppeteer = require('puppeteer')
const { generateImage } = require('typesetters-son')

module.exports = function() {
  this.cacheable()
  const callback = this.async()

  const calendarPath = path.join(__dirname, '../models/calendar.yml')
  const templatePath = path.join(__dirname, '../images/social.svg')
  this.addDependency(calendarPath)
  this.addDependency(templatePath)

  const calendarText = fs.readFileSync(calendarPath)
  const calendarData = yaml.safeLoad(calendarText, 'utf8')

  calendarData.reverse()
  const now = moment()
  const nextEvent = calendarData.find(event => moment(event.day).isAfter(now))
  const dayDate = moment(moment(nextEvent.day))
  const dateText = dayDate.format('dddd, MMMM D')
  const outputName = `social-${dayDate.format('YYYY-MM')}.jpg`

  puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    .then(browser =>
      generateImage({
        browserWSEndpoint: browser.wsEndpoint(),
        url: `file:${templatePath}`,
        output: path.join(__dirname, '../images/', outputName),
        width: 1200,
        height: 630,
        subs: {
          '#date': `${dateText} at 7 PM Pacific`,
        },
      })
    )
    .then(
      () => callback(null, `module.exports = '${outputName}'`),
      err => callback(err)
    )
}
