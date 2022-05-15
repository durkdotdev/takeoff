import execa from "execa";

export const getNpmRegistry = async (
  pkgManager: "npm" | "yarn"
): Promise<string> => {
  try {
    const { stdout: registry } = await execa(pkgManager, [
      "config",
      "get",
      "registry"
    ]);
    return registry;
  } catch (error) {
    return "";
  }
};
