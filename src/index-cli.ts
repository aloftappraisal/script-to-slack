import { main } from "./main.js";

main().then(
  () => {},
  (e) => {
    console.error(e);
    process.exit(1);
  }
);
