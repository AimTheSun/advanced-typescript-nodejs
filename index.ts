import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes";
import messenger from "./src/controllers/createMessage";

const app = express();
//number type
const PORT: number = 3000;
// string type
const database: string = "mongodb://localhost/CRMdb";

//array
//let simpleArray: number[] = [1, 2, 3, 4];

// instance messenger class
let messages = new messenger(PORT);

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(database);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static("public"));

app.get("/", (req: Request, res: Response): any =>
  res.send(messages.messagePrint())
);

app.listen(PORT, () => console.log(messages.messagePrint()));
