import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS POLICY---allow custom origin
 app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN stack");
});

app.use("/books", booksRoute);

//database connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app is connected to database");
    app.listen(PORT, () => {
      console.log(`app is listen to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
