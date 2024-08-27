// import { adotInit, logger } from "@studiographene/nodejs-telemetry";
import { APP_NAME, APP_VERSION } from "./config/secret";

// const serviceNode = `${APP_NAME}@${APP_VERSION}`;
// adotInit(serviceNode, "/");


import app from "./app";


function normalizePort(val: string): string | boolean | number {
  const portVal = parseInt(val, 10);

  if (isNaN(portVal)) {
    return val;
  }

  if (portVal >= 0) {
    return portVal;
  }

  return false;
}


const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

const server = app.listen(app.get("port"), () => {
  console.log(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`,
    "server.ts"
  );
  console.log("Press CTRL-C to stop", "server.ts");
});

export default server;
