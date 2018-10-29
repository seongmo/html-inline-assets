const inline = require('../index')

const opts = {
  workingDir: __dirname
}

test('inline single script', () => {
  const orgHtml = `<!DOCTYPE html><html><head></head><body>hello<script src="/static/js/main.js"></script></body></html>`
  const output = inline(orgHtml, opts)
  const expected = `<!DOCTYPE html><html><head></head><body>hello<script>console.log('hello world')</script></body></html>`
  expect(output).toEqual(expected)
});

test('inline multiple scripts', () => {
  const orgHtml = `<!DOCTYPE html><html><head><script src="/static/js/hey.js"></script></head><body>hello<script src="/static/js/main.js"></script></body></html>`
  const output = inline(orgHtml, opts)
  const expected = `<!DOCTYPE html><html><head><script>console.log('hey')</script></head><body>hello<script>console.log('hello world')</script></body></html>`
  expect(output).toEqual(expected)
});

test('ignore remote script', () => {
  const orgHtml = `<!DOCTYPE html><html><head><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script></head><body>hello<script src="/static/js/main.js"></script></body></html>`
  const output = inline(orgHtml, opts)
  const expected = `<!DOCTYPE html><html><head><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script></head><body>hello<script>console.log('hello world')</script></body></html>`
  expect(output).toEqual(expected)
});

test('inline single style link', () => {
  const orgHtml = `<!DOCTYPE html><html><head><link href="/static/css/main.css" rel="stylesheet"></head><body>hello</body></html>`
  const output = inline(orgHtml, opts)
  const expected = `<!DOCTYPE html><html><head><style>body {
  background-color: skyblue;
}</style></head><body>hello</body></html>`
  expect(output).toEqual(expected)
});

test('inline multi style link', () => {
  const orgHtml = `<!DOCTYPE html><html><head><link href="/static/css/main.css" rel="stylesheet"><link href="/static/css/style.css" rel="stylesheet"></head><body>hello</body></html>`
  const output = inline(orgHtml, opts)
  const expected = `<!DOCTYPE html><html><head><style>body {
  background-color: skyblue;
}</style><style>body {
  color: #444;
}</style></head><body>hello</body></html>`
  expect(output).toEqual(expected)
});

test('ignore remote style link', () => {
  const orgHtml = `<!DOCTYPE html><html><head><link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"><link href="/static/css/style.css" rel="stylesheet"></head><body>hello</body></html>`
  const output = inline(orgHtml, opts)
  const expected = `<!DOCTYPE html><html><head><link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"><style>body {
  color: #444;
}</style></head><body>hello</body></html>`
  expect(output).toEqual(expected)
});