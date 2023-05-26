// src/index.ts
var admonitionTypes = [
  "abstract",
  "attention",
  "bug",
  "caution",
  "danger",
  "error",
  "example",
  "failure",
  "hint",
  "info",
  "note",
  "question",
  "quote",
  "success",
  "tip",
  "warning"
];
var startReg = new RegExp(`^!!!\\s+(${admonitionTypes.join("|")})(?:\\s+)?(.*)$`);
var endReg = /^!!!\s*$/;
var debug = false;
var config = { nodeName: "div", className: "admonition", title: { nodeName: "p" } };
var admonitionPlugin = {
  name: "admonition",
  level: "block",
  start(src) {
    var _a;
    const index = (_a = src.match(new RegExp(`(^|[\\r\\n])!!!\\s+(${admonitionTypes.join("|")})(?:\\s+)?(.*)`))) == null ? void 0 : _a.index;
    debug && console.log("\u{1F38B}[marked start]", src, index);
    return index;
  },
  tokenizer(src, _tokens) {
    debug && console.log("\u{1F5FC}[marked tokenizer]", src, _tokens);
    const lines = src.split(/\n/);
    if (startReg.test(lines[0])) {
      const section = { x: -1, y: -1 };
      const sections = [];
      for (let i = 0, k = lines.length; i < k; i++) {
        if (startReg.test(lines[i])) {
          section.x = i;
        } else if (endReg.test(lines[i])) {
          section.y = i;
          if (section.x >= 0) {
            sections.push({ ...section });
            section.x = -1;
            section.y = -1;
          }
        }
      }
      if (sections.length) {
        const section2 = sections[0];
        const [_, icon, title] = startReg.exec(lines[section2.x]) || [];
        const text = lines.slice(section2.x + 1, section2.y).join("\n");
        const raw = lines.slice(section2.x, section2.y + 1).join("\n");
        const token = {
          type: "admonition",
          raw,
          icon,
          title,
          text,
          titleTokens: [],
          tokens: [],
          childTokens: ["title", "text"]
        };
        this.lexer.inlineTokens(token.title, token.titleTokens);
        this.lexer.blockTokens(token.text, token.tokens);
        return token;
      }
    }
  },
  renderer(token) {
    debug && console.log("\u{1F409}[marked renderer]", this, token);
    const html = `<${config.nodeName} class="${config.className} ${config.className}-${token.icon}">
    <${config.title.nodeName} class="${config.className}-title">${this.parser.parseInline(
      token.titleTokens,
      null
    )}</${config.title.nodeName}>
    ${this.parser.parse(token.tokens)}
    </${config.nodeName}>`;
    return html;
  }
};
var extensions = [admonitionPlugin];
var setConfig = (data) => {
  config = data;
};
var src_default = {
  extensions
};
export {
  admonitionTypes,
  src_default as default,
  setConfig
};
