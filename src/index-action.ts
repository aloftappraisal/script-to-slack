import { setFailed } from "@actions/core";
import { main } from "./main.js";

main().then(
  () => {},
  (e) => {
    console.error(e);
    setFailed(e.message);
  }
);
