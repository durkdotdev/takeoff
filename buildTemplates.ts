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
  "influx.config.js",
  "tailwind.config.js"
];
const languages = ["js", "ts"];
const languagesBlacklist = {
  js: {
    devDependencies: [
      "@types/bcryptjs",
      "@types/micro",
      "@types/node",
      "@types/nodemailer",
      "@types/react",
      "tsconfig",
      "typescript"
    ]
  },
  ts: {}
};
// @ts-ignore
const nodeModulesFilter = (file) => {
  return !file.includes("node_modules");
};
const packages = {
  js: ["config"],
  ts: ["config", "tsconfig"]
};
const uis = ["chakra", "daisy", "influx", "tailwind", "unstyled"];
const uisAppsFileBlacklist = {
  chakra: [
    "daisy.config.js",
    "influx.config.js",
    "postcss.config.js",
    "tailwind.config.js"
  ],
  daisy: ["influx.config.js", "tailwind.config.js", "theme.js", "theme.ts"],
  influx: ["daisy.config.js", "tailwind.config.js", "theme.js", "theme.ts"],
  tailwind: ["daisy.config.js", "influx.config.js", "theme.js", "theme.ts"],
  unstyled: [
    "daisy.config.js",
    "influx.config.js",
    "postcss.config.js",
    "tailwind.config.js",
    "theme.js",
    "theme.ts"
  ]
};
const uisPackagesBlacklist = {
  chakra: {
    dependencies: [
      "daisyui",
      "influx-ui",
      "next-themes",
      "nightwind",
      "react-icons"
    ],
    devDependencies: ["autoprefixer", "postcss", "tailwindcss"]
  },
  daisy: {
    dependencies: [
      "@chakra-ui/icons",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
      "influx-ui",
      "nightwind"
    ]
  },
  influx: {
    dependencies: [
      "@chakra-ui/icons",
      "@chakra-ui/react",
      "@emotion/react",
      "@emotion/styled",
      "daisyui",
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
      "daisyui",
      "influx-ui"
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
      "influx-ui",
      "next-themes",
      "nightwind",
      "react-icons"
    ],
    devDependencies: ["autoprefixer", "postcss", "tailwindcss"]
  }
};

const main = async () => {
  // remove old
  fse.removeSync("./templates/js");
  fse.removeSync("./templates/ts");

  for (const language of languages) {
    // copy shared
    fse.copySync("./templates/_files/shared", "./templates/shared");

    // copy apps
    // add shared apps files
    // remove appsDeleteFiles
    // move app's ui pages to ui/apps/<app>/<ui>/pages
    // rename to <app>
    // remove package.json, create ui-specific package.json for each apps's ui in ui/apps/<app>/<ui>/package.json
    for (const app of apps) {
      fse.copySync(
        `./apps/${app}-${language}`,
        `./templates/shared/apps/${app}`,
        { filter: nodeModulesFilter }
      );
      for (const file of appsDeleteFiles) {
        fse.removeSync(`./templates/shared/apps/${app}/${file}`);
      }
      for (const file of appsSharedFiles) {
        fse.copySync(
          `./templates/_files/apps/${file}`,
          `./templates/shared/apps/${app}/${file}`
        );
      }

      const pckgJSON = JSON.parse(
        JSON.stringify(require(`./templates/shared/apps/${app}/package.json`))
      );
      fse.removeSync(`./templates/shared/apps/${app}/package.json`);

      // remove appropriate dependencies
      // @ts-ignore
      const languageBlacklist = languagesBlacklist[language];
      for (const dependencyKey of Object.keys(languageBlacklist)) {
        for (const pckg of languageBlacklist[dependencyKey]) {
          delete pckgJSON[dependencyKey][pckg];
        }
      }
      fse.writeJsonSync(
        `./templates/shared/apps/${app}/package.json`,
        pckgJSON,
        { spaces: "\t" }
      );

      for (const ui of uis) {
        // move pages
        fse.moveSync(
          `./templates/shared/apps/${app}/pages/${ui}`,
          `./templates/ui/apps/${app}/${ui}/pages`
        );

        if (ui !== "unstyled") {
          fse.copySync(
            `./templates/_files/apps/pages/${language}/${ui}`,
            `./templates/ui/apps/${app}/${ui}/pages`
          );
        }

        await replace({
          files: `./templates/ui/apps/${app}/${ui}/pages/**/*.${
            language === "js" ? "js" : "tsx"
          }`,
          from: RegExp(`from "${ui}-${language}";`, "g"),
          to: `from "ui";`
        });

        // replace "../lib..." imports to one less level
        let importStr = "../lib";
        let replaceImportStr = "lib";
        for (const importDir of ["../", "../"]) {
          importStr = importDir + importStr;
          replaceImportStr = importDir + replaceImportStr;
          await replace({
            files: `./templates/ui/apps/${app}/${ui}/pages/**/*.${
              language === "js" ? "js" : "tsx"
            }`,
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
        fse.writeJsonSync(
          `./templates/ui/apps/${app}/${ui}/package.json`,
          uiPckgJSON,
          { spaces: "\t" }
        );
      }
    }

    // copy packages
    // @ts-ignore
    for (const pckg of packages[language]) {
      fse.copySync(
        `./packages/${pckg}${
          ["config", "tsconfig"].includes(pckg) ? "" : "-" + language
        }`,
        `./templates/shared/packages/${pckg}`
      );
    }
    // copy ui packages
    // rename to "ui"
    for (const ui of uis) {
      fse.copySync(
        `./packages/${ui}-${language}`,
        `./templates/ui/packages/${ui}`
      );
      const pckgJSON = require(`./packages/${ui}-${language}/package.json`);
      pckgJSON.name = "ui";
      fse.writeJsonSync(
        `./templates/ui/packages/${ui}/package.json`,
        pckgJSON,
        { spaces: "\t" }
      );
    }

    /// Create Templates
    for (const ui of uis) {
      // copy universal files
      fse.copySync("./templates/shared", `./templates/${language}/${ui}`);

      // remove uisAppsFileBlacklist
      // copy ui package.json and pages
      for (const app of apps) {
        // @ts-ignore
        for (const file of uisAppsFileBlacklist[ui]) {
          fse.removeSync(`./templates/${language}/${ui}/apps/${app}/${file}`);
        }

        fse.copySync(
          `./templates/ui/apps/${app}/${ui}/package.json`,
          `./templates/${language}/${ui}/apps/${app}/package.json`
        );

        fse.copySync(
          `./templates/ui/apps/${app}/${ui}/pages`,
          `./templates/${language}/${ui}/apps/${app}/pages`
        );

        // FOR DAISY ONLY
        // Rename daisy.config.js to tailwind.config.js
        if (ui === "daisy") {
          fse.renameSync(
            `./templates/${language}/${ui}/apps/${app}/daisy.config.js`,
            `./templates/${language}/${ui}/apps/${app}/tailwind.config.js`
          );
        }

        // FOR INFLUX ONLY
        // Rename influx.config.js to tailwind.config.js
        if (ui === "influx") {
          fse.renameSync(
            `./templates/${language}/${ui}/apps/${app}/influx.config.js`,
            `./templates/${language}/${ui}/apps/${app}/tailwind.config.js`
          );
        }

        // copy template ui package
        fse.copySync(
          `./templates/ui/packages/${ui}`,
          `./templates/${language}/${ui}/packages/ui`,
          { filter: nodeModulesFilter }
        );
      }
    }

    // remove helper directories
    fse.removeSync("./templates/shared");
    fse.removeSync("./templates/ui");
  }
};

if (require.main === module) {
  main();
}
