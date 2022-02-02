import app from "./app.js";
import connectDB from "./loaders/database.js";

connectDB();

app.listen(3000, () => {
  console.log("app is running.");
});
