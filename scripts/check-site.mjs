import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import assert from "node:assert/strict";

const read = (file) => fs.readFileSync(path.resolve(file), "utf8");
const html = read("index.html");
const css = read("assets/css/styles.css");
const js = read("assets/js/app.js");
const config = read("config.js");

new vm.Script(js, { filename: "assets/js/app.js" });
new vm.Script(config, { filename: "config.js" });

assert.match(html, /href="assets\/css\/styles\.css"/, "CSS vinculado");
assert.match(html, /src="assets\/js\/app\.js"/, "JavaScript vinculado");
assert.match(html, /<noscript>/, "fallback para JavaScript desabilitado");
assert.match(css, /prefers-reduced-motion/, "respeito a movimento reduzido");
assert.match(css, /:focus-visible/, "indicador de foco visível");
assert.match(js, /wa\.me\//, "geração de link do WhatsApp");
assert.match(js, /target\.focus\(\)/, "restauração de foco após mudança no carrinho");
assert.match(js, /unit:p\.price/, "recálculo de preço ao recuperar armazenamento");

const ids = [...js.matchAll(/\{id:"([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, 20, "20 produtos cadastrados");
assert.equal(new Set(ids).size, ids.length, "identificadores de produtos únicos");

for (const id of ids) {
  const file = path.join("assets", "products", `${id}.svg`);
  assert.ok(fs.existsSync(file), `Imagem faltando: ${file}`);
  const content = read(file);
  assert.match(content, /^<svg\b/, `Raiz SVG: ${id}`);
  assert.match(content, /<\/svg>\s*$/, `Fechamento SVG: ${id}`);
}
console.log(`PASS: JavaScript, HTML, acessibilidade estrutural e ${ids.length} imagens de produto.`);
