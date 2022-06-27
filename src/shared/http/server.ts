import "dotenv/config";
import { app } from "./app";

app.listen(3333, () => {
  console.log("Server is running in port 3333");
  console.log(process.env.DATABASE_URL);
});
