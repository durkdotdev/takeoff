#!/usr/bin/env node

import chalk from "chalk";
import execa from "execa";
import fse from "fs-extra";
import download from "github-directory-downloader";
import gradient from "gradient-string";
import inquirer from "inquirer";
import ora from "ora";
import * as path from "path";
import { tryGitInit } from "./git";
import { getNpmRegistry } from "./registry";
import { shouldUseYarn } from "./yarn";

const takeoffGradient = gradient("#a5b4fc", "#e879f9");

const main = async () => {
  // start
  console.log();
  console.log(chalk.bold(takeoffGradient("TAKEOFF")));

  // introduction
  console.log("Let's get your SaaS ready and set up your codebase.");

  // get app directory
  console.log();
  const location = (
    await inquirer.prompt<{ location: string }>([
      {
        name: "location",
        type: "input",
        message: "Where would you like to create your SaaS?",
        default: "./my-app"
      }
    ])
  ).location;
  let projectDir = path.resolve(process.cwd(), location);

  // create new directory
  let relativeProjectDir = path.relative(process.cwd(), projectDir);
  let projectDirIsCurrentDir = relativeProjectDir === "";
  if (!projectDirIsCurrentDir) {
    if (fse.existsSync(projectDir)) {
      console.log();
      console.log(
        `${chalk.redBright.bold(
          "ERROR:"
        )}, "${relativeProjectDir}" already exists! Please try again with a different directory.`
      );
      console.log();
      process.exit(1);
    } else {
      fse.mkdirSync(projectDir);
    }
  }

  // get language
  const language = (
    await inquirer.prompt<{ language: string }>([
      {
        name: "language",
        type: "list",
        message: "Which language do you want to use?",
        choices: [
          { name: "TypeScript (default)", value: "ts" },
          { name: "JavaScript", value: "js" }
        ]
      }
    ])
  ).language;

  // get template
  const template = (
    await inquirer.prompt<{ template: string }>([
      {
        name: "template",
        type: "list",
        message: "Which design system do you want to use?",
        choices: [
          { name: "Influx UI (default)", value: "influx" },
          { name: "Chakra UI", value: "chakra" },
          { name: "Tailwind CSS", value: "tailwind" },
          { name: "TailwindCSS + daisyUI", value: "daisy" },
          { name: "Unstyled", value: "unstyled" }
        ]
      }
    ])
  ).template;

  // create directory
  console.log();
  console.log(chalk.bold(`Creating ${location}...`));
  console.log();
  console.log(chalk.bold("Generating files..."));

  // copy appropriate template
  // copy appropriate template
  // Development
  // fse.copySync(`../../templates/${language}/${template}`, projectDir);
  // Production - clone from GitHub repository
  await download(
    `https://github.com/durkdotdev/takeoff/tree/master/templates/${language}/${template}`,
    projectDir,
    { muteLog: true }
  );

  process.chdir(projectDir);

  // install dependencies
  console.log();
  const spinner = ora("Installing dependencies").start();

  const pkgManager = shouldUseYarn() ? "yarn" : "npm";
  const npmRegistry = await getNpmRegistry(pkgManager);

  await execa(`${pkgManager}`, [`install`, `--registry=${npmRegistry}`], {
    stdio: "ignore",
    cwd: projectDir
  });

  spinner.stop();
  console.log();
  console.log("Installed dependencies.");

  // try git init and git commit
  tryGitInit();

  // success
  console.log();
  console.log(`${chalk.greenBright.bold("SUCCESS!")}`);
  console.log();
  console.log(
    `We reccomend you create a ${chalk.bold(
      ".env"
    )} file with the proper environment variables. To view a sample file, see ${chalk.bold(
      "/apps/app/example.env"
    )}.`
  );
  console.log();
  console.log(
    "Then, you can run the following scripts to initialize your database and start a development server:"
  );
  console.log();
  console.log(`${chalk.bold("yarn takeoff-init")}\n`);
  console.log(chalk.bold("yarn dev"));
  console.log();
  console.log(
    `TAKEOFF has automatically created the following ${
      language === "js" ? "JavaScript" : "TypeScript"
    } project:`
  );
  console.log();
  console.log(
    `${chalk.bold(
      "apps/app"
    )}\t- Your SaaS app with a database, Stripe subscriptions, and user authentication`
  );
  console.log();
  console.log(`${chalk.bold("apps/marketing")}\t- Your SaaS marketing website`);
  console.log();
  console.log(
    `${chalk.bold(
      "packages/ui"
    )}\t- Your React component library with ${chalk.bold(
      template
    )} as the design system, used by both app and marketing`
  );
  console.log();
  process.exit(1);
};

if (require.main === module) {
  main();
}
