import path from "path";
import fs from "fs";
import { ErrorHandler } from "../utils/errors.js";

export default class ImageService {
  #address = path.join(path.resolve() + "/uploads/");
  upload(image) {
    return new Promise((resolve, reject) => {
      if (!image) resolve("");

      image.mv(`${this.#address + image.name}`, (err) => {
        if (err) reject(new ErrorHandler(err.message, 500));

        resolve(image.name);
      });
    });
  }
  remove(image) {
    return new Promise((resolve, reject) => {
      if (!image) resolve("There is no image to remove.");

      fs.unlink(this.#address + image, (err) => {
        if (err) reject(new ErrorHandler(err.message, 500));
        resolve(true);
      });
    });
  }
  update(dbImage, currentImage) {
    return new Promise(async (resolve, reject) => {
      try {
        // The user did not change the image.
        if ((dbImage && !currentImage) || (!dbImage && !currentImage))
          resolve(dbImage);

        // The article did not have the image. The user added an image to it.
        if (!dbImage && currentImage) resolve(await this.upload(currentImage));

        // The user changed the current image.
        if (currentImage) {
          await this.remove(dbImage);
          const newImage = await this.upload(currentImage);
          resolve(newImage);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
