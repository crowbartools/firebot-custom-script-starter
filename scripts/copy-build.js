/**
 *  Copies the built script .js to Firebot's scripts folder
 */
const fs = require("fs").promises;
const { Console } = require("console");
const path = require("path");

const extractScriptName = () => {
  const packageJson = require("../package.json");
  return `${packageJson.scriptOutputName}.js`;
};

const getFirebotScriptsFolderPath = () => {
  // determine os app data folder
  let appDataFolderPath;
  if (process.platform === "win32") {
    appDataFolderPath = process.env.APPDATA;
  } else if (process.platform === "darwin") {
    appDataFolderPath = path.join(
      process.env.HOME,
      "/Library/Application Support"
    );
  } else if (process.platform === "linux") {
    appDataFolderPath = path.join(
      process.env.HOME,
      "/.config"
    );
  } else {
    throw new Error("Unsupported OS!");
  }

  const firebotDataFolderPath = path.join(appDataFolderPath, "/Firebot/v5/");
  const firebotGlobalSettings = require(path.join(
    firebotDataFolderPath,
    "global-settings.json"
  ));

  if (
    firebotGlobalSettings == null ||
    firebotGlobalSettings.profiles == null ||
    firebotGlobalSettings.profiles.loggedInProfile == null
  ) {
    throw new Error("Unable to determine active profile");
  }

  const activeProfile = firebotGlobalSettings.profiles.loggedInProfile;

  const scriptsFolderPath = path.join(
    firebotDataFolderPath,
    `/profiles/${activeProfile}/scripts/`
  );
  return scriptsFolderPath;
};

const main = async () => {
  const firebotScriptsFolderPath = getFirebotScriptsFolderPath();

  const scriptName = extractScriptName();

  const srcScriptFilePath = path.resolve(`./dist/${scriptName}`);
  const destScriptFilePath = path.join(
    firebotScriptsFolderPath,
    `${scriptName}`
  );

  await fs.copyFile(srcScriptFilePath, destScriptFilePath);

  console.log(`Successfully copied ${scriptName} to Firebot scripts folder.`);
};

main();
