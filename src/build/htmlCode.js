import { config } from "../lib/consts"
import { jsCode } from "./jsCode"

const optymalizeHtml = (text) =>
  text
    .replace(/\n/g, ` `)
    .replace(/\s{2,}/g, ` `)
    .replace(/> /g, `>`)
    .replace(/ </g, `<`)
    .replace(/; /g, `;`)
    .replace(/ {/g, `{`)
    .replace(/{ /g, `{`)

export const htmlCode = () =>
  `${optymalizeHtml(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="author" content="${config.author}">
    <meta name="description" content="${config.description}">
    <meta name="keywords" content="${config.gameName},${config.author}">

    <title>${config.gameName}</title>

    <style>
      body {
        background-color:black;
        margin:0;
        border:0;
        padding:0;
        user-select:none;
        width:100vw;
        height:100vh;
        overflow:hidden;
      }
    </style>
  </head>
  <body>
    <canvas></canvas>
    <script>
      `)}${jsCode()}${optymalizeHtml(`
    </script>
  </body>
</html>
`)}`
