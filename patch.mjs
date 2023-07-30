const p1 = './node_modules/entities/package.json'
const p2 = './node_modules/lit-html/package.json'
const p3 = './node_modules/@lit/reactive-element/package.json'

import fs from 'fs'

for (const p of [p1, p2, p3]) {
  // for all exports path, copy the node condition as worker condition, put it before the worker condition
  const code = fs.readFileSync(p, 'utf8')
  const json = JSON.parse(code)

  for (const [key, value] of Object.entries(json.exports)) {
    if (typeof value === 'object') {
      if (process.argv.includes('--undo')) {
        json.exports[key] = {
          types: value.types,
          // no worker
          node: value.node,
          development: value.development,
          default: value.default
        }
      } else {
        json.exports[key] = {
          types: value.types,
          browser: value.node,
          worker: value.node,
          node: value.node,
          development: value.development,
          default: value.default
        }
      }
    }
  }

  fs.writeFileSync(p, JSON.stringify(json, null, 2) + '\n')
}
