import fs from "fs";
import path from "path";
import { ErrorHandler } from "../utils/errors.js";

function write(type, folderName, message) {
  const folder = path.join(path.resolve() + `/logs/${folderName}`);

  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  return fs.appendFile(
    path.join(path.resolve() + `/logs/${folderName}/${type}.log`),
    JSON.stringify(message) + "\n",
    (err) => {
      if (err) {
        throw new ErrorHandler(err.message, 500);
      }
    }
  );
}

const logger = {
  info: (folderName, message) => write("info", folderName, message),
  error: (folderName, message) => {
    write("error", folderName, message);
    logger.console(message);
  },
  html: (event, status, message) => {
    return fs.appendFileSync(
      path.join(path.resolve() + "/logs/html.log"),
      `<div class="log"><span class="log-event">${event}</span> : <span class="${
        status < 300 ? "success-stat" : status > 400 ? "error-stat" : ""
      }">${status} : </span><span class="log-inf">${message}</span></div>`
    );
  },
  console: (message) => {
    if (process.env.NODE_ENV !== "production") {
      process.stdout.write(message + "\n");
    }
  },
};

export default logger;
