import { config } from "../lib/consts"
import { jsCode } from "./jsCode"

function optymalizeHtml(text: string) {
  return text
    .replaceAll(`\n`, ` `)
    .replaceAll(/\s{2,}/g, ` `)
    .replaceAll(`> `, `>`)
    .replaceAll(` <`, `<`)
    .replaceAll(`; `, `;`)
    .replaceAll(` {`, `{`)
    .replaceAll(`{ `, `{`)
    .replaceAll(` "`, `"`)
    .replaceAll(`" `, `"`)
}

export function htmlCode() {
  return `${optymalizeHtml(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="author" content="${config.author}">
    <meta name="description" content="${config.description}">
    <meta name="keywords" content="${config.gameName},${config.author}">

    <title>${config.gameName}</title>

  </head>
  <body style="
    background-color:black;
    margin:0;
    border:0;
    padding:0;
    user-select:none;
    width:100vw;
    height:100vh;
    overflow:hidden;">

    <canvas></canvas>
    <script>
      `)}${jsCode()}${optymalizeHtml(`
    </script>
  </body>
</html>
`)}`
}
