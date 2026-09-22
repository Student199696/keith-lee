import { spawn } from "node:child_process";
import process from "node:process";

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const child = spawn(command, ["next", "build", "--webpack"], {
  cwd: process.cwd(),
  env: { ...process.env, VERCEL: "1" },
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 1));
