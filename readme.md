Add this to your `package.json`:

```json
{
  "dependencies": {
    "lit-edge-patch": "github:PonomareVlad/lit-edge-patch"
  },
  "scripts": {
    "postinstall": "node ./node_modules/lit-edge-patch/patch.mjs"
  }
}
```
