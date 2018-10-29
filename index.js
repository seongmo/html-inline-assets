const fs = require('fs')
const cheerio = require('cheerio')
const path = require('path')

module.exports = function inline(html, opts = {}) {
  const {workingDir = __dirname} = opts
  const {ignoreScripts = ['^https?://']} = opts
  const {ignoreStyles = ['^https?://']} = opts

  const $ = cheerio.load(html)

  const someRegex = arr => str => arr.some(re => RegExp(re).test(str))
  const isIgnoreScript = someRegex(ignoreScripts)
  const isIgnoreStyle = someRegex(ignoreStyles)
  
  $('script[src]')
    .filter((_, el) => !isIgnoreScript($(el).attr('src')))
    .each(function(_, el) {
      const src = $(el).attr('src')
      const content = fs.readFileSync(path.join(workingDir, src))
      $(el).text(content).removeAttr('src')
    })
    
  $('link[rel=stylesheet][href]')
    .filter((_, el) => !isIgnoreStyle($(el).attr('href')))
    .each(function(_, el) {
      const src = $(el).attr('href')
      const content = fs.readFileSync(path.join(workingDir, src))
      $(el).replaceWith(`<style>${content}</style>`)
    })

  return $.html()
}