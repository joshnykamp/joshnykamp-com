import fs from "fs";
import path from "path";

const ENV_LOCAL_PATH = path.join(process.cwd(), ".env.local");

/** Loads .env then .env.local into process.env, mirroring Next.js's own precedence. */
export function loadEnv() {
  for (const file of [".env", ".env.local"]) {
    try {
      process.loadEnvFile(path.join(process.cwd(), file));
    } catch {
      // File doesn't exist — fine, these are both optional.
    }
  }
}

/** Upserts key=value pairs into .env.local without disturbing unrelated lines. */
export function upsertEnvLocal(values: Record<string, string>) {
  let contents = fs.existsSync(ENV_LOCAL_PATH) ? fs.readFileSync(ENV_LOCAL_PATH, "utf-8") : "";

  for (const [key, value] of Object.entries(values)) {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");

    if (pattern.test(contents)) {
      contents = contents.replace(pattern, line);
    } else {
      if (contents.length > 0 && !contents.endsWith("\n")) contents += "\n";
      contents += `${line}\n`;
    }
  }

  fs.writeFileSync(ENV_LOCAL_PATH, contents);
}

export function readEnvLocal(key: string): string | undefined {
  if (!fs.existsSync(ENV_LOCAL_PATH)) return undefined;
  const contents = fs.readFileSync(ENV_LOCAL_PATH, "utf-8");
  const match = contents.match(new RegExp(`^${key}=(.*)$`, "m"));
  return match?.[1];
}
