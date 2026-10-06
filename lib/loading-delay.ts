import "server-only";
import { setTimeout as wait } from "node:timers/promises";

const DEFAULT_DEVELOPMENT_DELAY_MS = 1000;
const MAX_DELAY_MS = 10_000;

function getDelayMs() {
  const configuredDelay = Number(process.env.LOADING_UI_DELAY_MS);
  if (Number.isFinite(configuredDelay) && configuredDelay >= 0) {
    return Math.min(configuredDelay, MAX_DELAY_MS);
  }

  return process.env.NODE_ENV === "development" ? DEFAULT_DEVELOPMENT_DELAY_MS : 0;
}

export async function delayForLoadingUi() {
  const delayMs = getDelayMs();
  if (delayMs > 0) {
    await wait(delayMs);
  }
}
