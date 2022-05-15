import { execSync } from "child_process";

export const isInGitRepository = (): boolean => {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch (error) {}
  return false;
};

export const tryGitInit = (): boolean => {
  try {
    execSync("git --version", { stdio: "ignore" });
    if (isInGitRepository()) {
      return false;
    }

    execSync("git init", { stdio: "ignore" });
    execSync("git checkout -b main", { stdio: "ignore" });
    execSync("git add -A", { stdio: "ignore" });
    execSync('git commit -m "Initial commit from Create TAKEOFF"', {
      stdio: "ignore"
    });
    return true;
  } catch (error) {}
  return false;
};
