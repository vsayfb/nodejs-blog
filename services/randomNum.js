import RandomNumber from "../models/randomNum.js";
import { ErrorHandler } from "../utils/errors.js";

function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export default class RandomNumService {
  static verifySubmittedCode = async (_id, num) => {
    const result = await RandomNumber.findOne({ _id, num });

    if (!result) throw new ErrorHandler("Invalid code!", 400);

    return result;
  };

  static create = () => {
    return new RandomNumber({ num: generateRandomNumber() }).save();
  };

  static removeSubmittedCode = async (_id) => {
    const code = await RandomNumber.findByIdAndDelete(_id);

    if (!code) throw new ErrorHandler("Invalid Code!", 400);

    return code;
  };
}
