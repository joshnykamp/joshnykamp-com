import readline from "readline";
import { exec } from "child_process";

export function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/** Best-effort — falls through silently on non-macOS or if `open` is unavailable. */
export function tryOpenBrowser(url: string) {
  exec(`open "${url}"`, () => {});
}
