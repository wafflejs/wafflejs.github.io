/* eslint-env mocha, node */
'use strict'
const fs = require('fs')
const yaml = require('js-yaml')
const expect = require('chai').expect

describe('calendar', () => {
  it('contains all the required keys and values', (done) => {
    fs.readFile(__dirname + '/../models/calendar.yml', 'utf8', (err, data) => {
      if (err) return done(err)

      let calendar = yaml.safeLoad(data)
      expect(calendar).to.have.length.above(0)

      calendar.forEach((day) => {
        expect(day).to.contain.property('day').that.is.a('string')

        if (day.schedule) {
          day.schedule.forEach((event) => {
            expect(Object.keys(event)).to.have.length(1)
            event = event[Object.keys(event)[0]]

            switch (typeof event) {
            case 'string':
              expect(event).to.have.length.above(0)
              break
            case 'object':
              expect(event).to.contain.property('title').that.is.a('string')
              if ('person' in event || 'people' in event)
                expect(event).to.contain.property('type').that.is.a('string')
              break
            default:
              expect(typeof event).to.be.oneOf(['string', 'object'])
            }
          })
        }
      })

      done()
    })
  })
})
