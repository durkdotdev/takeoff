const fse = require("fs-extra");
const replace = require("replace-in-file");

const apps = ["app", "marketing"];
const appsDeleteFiles = [
  ".next/",
  "pages/_app.tsx",
  "pages/_document.tsx",
  "styles",
  ".env",
  "next.config.js"
];
const appsSharedFiles = [
  "next.config.js",
  "daisy.config.js",
  "tailwind.config.js"
];
const copyFiles = [".eslintrc.js", ".prettierrc.js", "turbo.json"];
const nodeModulesFilter = (file) => {
  return !file.includes("node_modules");
};
const packages = ["config", "tsconfig"];
const uis = ["chakra", "daisy", "tailwind", "unstyled"];
const uisAppsFileBlacklist = {
  chakra: ["daisy.config.js", "postcss.config.js", "tailwind.config.js"],
  daisy: ["tailwind.config.js", "theme.ts"],
  tailwind: ["daisy.config.js", "theme.ts"],
  unstyled: ["postcss.config.js", "tailwind.config.js", "theme.ts"]
};
const uisPackagesBlacklist = {
  chakra: {
    dependencies: ["daisyui", "next-themes", "nightwind", "react-icons"],
    devDependencies: ["autoprefixer", "postcss", "tailwindcss"]
  },
  daisy: {
    dependencies: [
      "@chakra-ui/icons",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
      "nightwind"
    ]
  },
  tailwind: {
    dependencies: [
      "@chakra-ui/icons",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
      "daisyui"
    ]
  },
  unstyled: {
    dependencies: [
      "@chakra-ui/icons",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "daisyui",
      "framer-motion",
      "next-themes",
      "nightwind",
      "react-icons"
    ],
    devDependencies: ["autoprefixer", "postcss", "tailwindcss"]
  }
};

const main = async () => {
  // remove old
  await fse.emptyDirSync("./takeoff-templates");
  // copy shared
  await fse.copySync("./takeoff-files/shared", "./takeoff-templates/shared");
  // copy main files
  for (const file of copyFiles) {
    await fse.copySync(`${file}`, `./takeoff-templates/shared/${file}`);
  }

  // copy apps
  // add shared apps files
  // remove appsDeleteFiles
  // move app's ui pages to ui/apps/<app>/<ui>/pages
  // rename to <app>
  // remove package.json, create ui-specific package.json for each apps's ui in ui/apps/<app>/<ui>/package.json
  for (const app of apps) {
    await fse.copySync(
      `./apps/takeoff-${app}`,
      `./takeoff-templates/shared/apps/${app}`,
      { filter: nodeModulesFilter }
    );
    for (const file of appsDeleteFiles) {
      await fse.removeSync(`./takeoff-templates/shared/apps/${app}/${file}`);
    }
    for (const file of appsSharedFiles) {
      await fse.copySync(
        `./takeoff-files/apps/${file}`,
        `./takeoff-templates/shared/apps/${app}/${file}`
      );
    }

    const pckgJSON = JSON.parse(
      JSON.stringify(
        require(`./takeoff-templates/shared/apps/${app}/package.json`)
      )
    );
    await fse.removeSync(`./takeoff-templates/shared/apps/${app}/package.json`);

    for (const ui of uis) {
      // move pages
      await fse.moveSync(
        `./takeoff-templates/shared/apps/${app}/pages/${ui}`,
        `./takeoff-templates/ui/apps/${app}/${ui}/pages`
      );
      await fse.copySync(
        `./takeoff-files/apps/pages/${ui}`,
        `./takeoff-templates/ui/apps/${app}/${ui}/pages`
      );
      await replace({
        files: `./takeoff-templates/ui/apps/${app}/${ui}/pages/**/*.tsx`,
        from: RegExp(`from "${ui}";`, "g"),
        to: `from "ui";`
      });

      // replace "../lib..." imports to one less level
      let importStr = "../lib";
      let replaceImportStr = "lib";
      for (const importDir of ["../", "../"]) {
        importStr = importDir + importStr;
        replaceImportStr = importDir + replaceImportStr;
        await replace({
          files: `./takeoff-templates/ui/apps/${app}/${ui}/pages/**/*.tsx`,
          from: RegExp(`from "${importStr}`, "g"),
          to: `from "${replaceImportStr}`
        });
      }

      const uiPckgJSON = JSON.parse(JSON.stringify(pckgJSON));
      // rename
      uiPckgJSON.name = app;

      // remove appropriate dependencies
      // @ts-ignore
      const packageBlacklist = uisPackagesBlacklist[ui];
      for (const dependencyKey of Object.keys(packageBlacklist)) {
        for (const pckg of packageBlacklist[dependencyKey]) {
          delete uiPckgJSON[dependencyKey][pckg];
        }
      }
      await fse.writeJsonSync(
        `./takeoff-templates/ui/apps/${app}/${ui}/package.json`,
        uiPckgJSON,
        { spaces: "\t" }
      );
    }
  }

  // copy packages
  for (const pckg of packages) {
    await fse.copySync(
      `./packages/${pckg}`,
      `./takeoff-templates/shared/packages/${pckg}`
    );
  }
  // copy ui packages
  // rename to "ui"
  for (const ui of uis) {
    await fse.copySync(
      `./packages/${ui}`,
      `./takeoff-templates/ui/packages/${ui}`
    );
    const pckgJSON = require(`./takeoff-templates/ui/packages/${ui}/package.json`);
    pckgJSON.name = "ui";
    await fse.writeJsonSync(
      `./takeoff-templates/ui/packages/${ui}/package.json`,
      pckgJSON,
      { spaces: "\t" }
    );
  }

  /// Create Templates
  for (const ui of uis) {
    // copy universal files
    await fse.copySync(
      "./takeoff-templates/shared",
      `./takeoff-templates/${ui}`
    );

    // remove uisAppsFileBlacklist
    // copy ui package.json and pages
    for (const app of apps) {
      // @ts-ignore
      for (const file of uisAppsFileBlacklist[ui]) {
        await fse.removeSync(`./takeoff-templates/${ui}/apps/${app}/${file}`);
      }

      await fse.copySync(
        `./takeoff-templates/ui/apps/${app}/${ui}/package.json`,
        `./takeoff-templates/${ui}/apps/${app}/package.json`
      );
      await fse.copySync(
        `./takeoff-templates/ui/apps/${app}/${ui}/pages`,
        `./takeoff-templates/${ui}/apps/${app}/pages`
      );

      // FOR DAISY ONLY
      // Rename daisy.config.js to tailwind.config.js
      if (ui === "daisy") {
        await fse.renameSync(
          `./takeoff-templates/${ui}/apps/${app}/daisy.config.js`,
          `./takeoff-templates/${ui}/apps/${app}/tailwind.config.js`
        );
      }

      // copy template ui package
      await fse.copySync(
        `./takeoff-templates/ui/packages/${ui}`,
        `./takeoff-templates/${ui}/packages/ui`,
        { filter: nodeModulesFilter }
      );
    }
  }

  // remove helper directories
  await fse.emptyDirSync("./takeoff-templates/shared");
  await fse.emptyDirSync("./takeoff-templates/ui");
};

if (require.main === module) {
  main();
}
