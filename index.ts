import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes";

const app = express();
//number type
const PORT: number = 3000;
// string type
const database: string = "mongodb://localhost/CRMdb";

//array
//let simpleArray: number[] = [1, 2, 3, 4];

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(database);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
