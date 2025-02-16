import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes";
import Messagespace from "./src/controllers/createMessage";
import { Settings } from "./settings";

const app = express();
// Environment constant
const environment: Messagespace.Environment = "development";

const PORT: number = 3000;

// string type
const database: string = "mongodb://localhost/CRMdb";

//array
//let simpleArray: number[] = [1, 2, 3, 4];

// instance messenger class
let messages = new Messagespace.Messenger(Settings.PORT, environment);

// interface Name {
//   firstName: string;
// }

// Generics type (T)
function nameCreator<T>(name: T): T {
  return name;
}

let myName = nameCreator<string>("Manny, ");

// const nameCreator = (name: Name): string => {
//   return `Hello, ${name.firstName},`;
// };

// let myName = { firstName: "Manny" };

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

app.listen(Settings.PORT, () => console.log(myName, messages.messagePrint()));
