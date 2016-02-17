// un-smartypants fancy quotes inside of handlebars: {{“like this”}}

module.exports = function(source) {
  this.cacheable()
  return source.replace(/{{([^}]*)}}/g, (match, p1) => {
    p1 = p1.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
    return `{{${p1}}}`
  })
}
