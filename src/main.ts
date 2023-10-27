import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
import childProcess from "child_process";
import path from "path";

function requiredEnv(key: string): string {
  const env = process.env[key];
  if (!env) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return env;
}

export async function main() {
  dotenv.config();

  const slackClient = new WebClient(requiredEnv("SLACK_BOT_TOKEN"));
  const slackChannelID: string = requiredEnv("SLACK_CHANNEL_ID");

  const command = requiredEnv("ACTION_INPUT_COMMAND");
  const dir = requiredEnv("ACTION_INPUT_DIR");

  if (!path.isAbsolute(dir)) {
    throw new Error(`ACTION_INPUT_DIR must be an absolute path. Got ${dir}`);
  }

  process.chdir(dir);
  const output = childProcess.execSync(command).toString("utf8");

  const message = await slackClient.chat.postMessage({
    channel: slackChannelID,
    text: output,
    unfurl_links: false,
  });
  if (!message.ok) {
    throw new Error(message.error);
  }
}
