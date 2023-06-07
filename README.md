# marked-admonition-extension
This is a [marked](https://github.com/markedjs/marked) admonition extension, to render out a nice warning message with simple markdown syntax, both support `ESM` and `CJS`.

> Warning: you must use Marked to use this extension!

## Usage
you can use `abstract`、`attention`、`bug`、`caution`、`danger`、`error`、`example`、`failure`、`hint`、`info`、`note`、`question`、`quote`、`success`、`tip`、`warning` as their theme;

the below code can be used in node.js, base CommonJs.
``` js
const { marked } = require('marked');
const admonition = require('marked-admonition-extension');

// custom tag name and class name (note: only version greater than v0.0.2 support)
// admonition.setConfig({ nodeName: 'details', className: 'details', title: { nodeName: 'summary' } });

// import the css file
require('marked-admonition-extension/dist/index.css');

marked.use(admonition.default);

const content = marked.parse(`!!! note this is a \`note\` type admonition
The warning above was a \`note\` type admonition
!!!`);

console.log(content);
```
it will output
``` html
<div class="admonition admonition-info">
    <p class="admonition-title">this is a <code>info</code> type admonition</p>
    <p>The warning above was a <code>info</code> type admonition</p>
</div>
```
![admonition note image](https://cdn.jsdelivr.net/gh/xiefucai/Chrome@master/images/admonition.png)
## Demo

Checkout the [demo page](https://stackblitz.com/edit/typescript-cbre5j?file=index.ts) to see marked in action ⛹️.
Or you can edit and view preview result in [markdown editor](https://xiefucai.gitee.io/article/**).

## License

Copyright (c) 2011-2023, Fucai.xie. (MIT License)