# html-inline-assets

Inline javascript, stylesheets, and images from an html page.

## Usage

```
Usage
  $ html-inline-assets <source.html> -o <output.html>
Options
  --source-file, -i      File to read
  --output-file, -o      File to write
  --help, -h            Displays this message

  --ignore-scripts      RegExp patterns to ignore scripts
  --ignore-styles       RegExp patterns to ignore styles
```

### Programmatic Usage

```js
const inline = require('html-inline-assets')

const opts = {
  ignoreScripts: ['https?://'],
  ignoreStyles: ['https?://', '/css/style.css'],
}

const output = inline(htmlString, opts)

```

## Todo

- Support link tag
- Support img tag
- Support remote resources
