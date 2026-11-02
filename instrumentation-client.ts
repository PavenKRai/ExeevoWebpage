import { initBotId } from "botid/client/core";

/**
 * Vercel BotID (Basic): an invisible challenge attached to the form posts, checked in the API routes with `checkBotId()`.
 * It needs Vercel's routes, so it is skipped on localhost (local dev and `next start` test runs), where the server check is also off.
 */
if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
  initBotId({
    protect: [
      { path: "/api/demo", method: "POST" },
      { path: "/api/newsletter", method: "POST" },
    ],
  });
}
