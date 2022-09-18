import type { marked } from 'marked';

const types = [
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
const startReg =
  new RegExp(`^!!!\\s+(${types.join('|')})\\s+(.*)$`);
  // /^!!!\s+(note|abstract|info|tip|success|question|warning|failure|danger|bug|example|quote|hint|caution|error|attention)\s+(.*)$/
const endReg = /^!!!\s*$/;
const debug = false;

const admonitionPlugin: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'admonition',
  level: 'block',
  start(this: marked.TokenizerThis, src: string) {
    const index = src.match(new RegExp(`(^|[\\r\\n])!!!\\s+(${types.join('|')})\\s+(.*)`))?.index;
    debug && console.log('🎋[marked start]', src, index);
    return index;
  },
  tokenizer(src: string, _tokens): marked.Tokens.Generic | void {
    debug && console.log('🗼[marked tokenizer]', src, _tokens);
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
        const section = sections[0];
        const [_, icon, title] = startReg.exec(lines[section.x]) || [];
        const text = lines.slice(section.x + 1, section.y).join('\n');
        const raw = lines.slice(section.x, section.y + 1).join('\n');
        const token = {
          type: 'admonition',
          raw,
          icon,
          title,
          text,
          titleTokens: [],
          tokens: [],
          childTokens: ['title', 'text'],
        };
  
        this.lexer.inlineTokens(token.title, token.titleTokens);
        this.lexer.blockTokens(token.text, token.tokens);
        return token;
      }
    }
  },
  renderer(this: marked.RendererThis, token) {
    debug && console.log('🐉[marked renderer]', this, token);
    const html = `<div class="admonition admonition-${token.icon}">
    <p class="admonition-title">${this.parser.parseInline(
      token.titleTokens, null as any
    )}</p>
    ${this.parser.parse(token.tokens!)}
    </div>`;
    return html;
  },
};

const extensions: (marked.TokenizerExtension | marked.RendererExtension)[] = [admonitionPlugin];

export default <marked.MarkedExtension>{
  extensions,
};