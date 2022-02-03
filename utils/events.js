import EventEmitter from "events";

const eventEmitter = new EventEmitter();

export default eventEmitter;

eventEmitter.on("created", (data) => {
  console.log(data);
});
