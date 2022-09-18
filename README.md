# marked-admonition-extension
an admonition extension for [marked](https://github.com/markedjs/marked), both support `ESM` and `CJS`.

## Usage
you can use `abstract`、`attention`、`bug`、`caution`、`danger`、`error`、`example`、`failure`、`hint`、`info`、`note`、`question`、`quote`、`success`、`tip`、`warning` as their theme;

the below code can be used in node.js, base CommonJs.
``` js
const { marked } = require('marked');
const admonition = require('marked-admonition-extension');

// import the css file
require('marked-admonition-extension/dist/index.css');

marked.use(admonition.default);

const content = marked.parse(`!!! info Publish ESM and CJS in a single package
In the past decade, due to the lack of a standard module system of \`JavaScript\`, **CommonJS** (a.k.a the \`require('xxx')\` and \`module.exports\` syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.
!!!`);

console.log(content);
```
it will output
``` html
<div class="admonition admonition-info">
    <p class="admonition-title">Publish ESM and CJS in a single package</p>
    <p>In the past decade, due to the lack of a standard module system of <code>JavaScript</code>, <strong>CommonJS</strong> (a.k.a the <code>require(&#39;xxx&#39;)</code> and <code>module.exports</code> syntax) has been the way how Node.js and NPM packages work. Until 2015, when ECMAScript modules finally show up as the standard solution, the community start migrating to native ESM gradually.</p>

    </div>
```

## Demo

Checkout the [demo page](https://stackblitz.com/edit/typescript-cbre5j?file=index.ts) to see marked in action ⛹️.
Or you can edit and view preview result in [markdown editor](https://xiefucai.gitee.io/article/**).

## License

Copyright (c) 2011-2022, Christopher Jeffrey. (MIT License)