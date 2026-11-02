import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    // Server actions POST to the current page path.
    {
      path: "/*",
      method: "POST",
      advancedOptions: {
        checkLevel: "basic",
      },
    },
  ],
});
