const fs = require('fs')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function inline(html, opts = {}) {
  const {workingDir = __dirname} = opts
  const {ignoreScripts = ['^https?://']} = opts
  const {ignoreStyles = ['^https?://']} = opts

  const dom = new JSDOM(html)
  // const script = dom.window.document.querySelector('script')
  dom.window.document.querySelectorAll('script').forEach(script => {
    if(!script.src) return;
    if(ignoreScripts.some(re => RegExp(re).test(script.src))) {
      return;
    }
    const content = fs.readFileSync(workingDir+script.src)
    script.innerHTML = content
    script.removeAttribute('src')
  })
  dom.window.document.querySelectorAll('link[rel=stylesheet]').forEach(link => {
    if(ignoreStyles.some(re => RegExp(re).test(link.href))) {
      return;
    }
    const content = fs.readFileSync(workingDir+link.href)
    link.outerHTML = '<style>'+content+'</style>'
  })

  const output = dom.serialize();
  return output
}