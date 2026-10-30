import { initBotId } from "botid/client/core";

/** Vercel BotID (Basic): an invisible challenge attached to the form posts, checked in the API routes with `checkBotId()`. */
initBotId({
  protect: [
    { path: "/api/demo", method: "POST" },
    { path: "/api/newsletter", method: "POST" },
  ],
});
