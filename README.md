# Starter Firebot Custom Script in Typescript

### Setup
1. Create a new repo based off this template or simply clone it.
2. `npm install`

### Building
1. `npm run build`
2. Copy the `.js` file in `/dist` to Firebot's `scripts` folder

### Note
- Keep the script definition object (that contains the `run`, `getScriptManifest`, and `getDefaultParameters` funcs) in the `index.ts` file as it's important those function names don't get minimized.
- Edit the `"scriptOutputName"` property in `package.json` to change the filename of the outputted script.
