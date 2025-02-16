import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes";
import Messagespace from "./src/controllers/createMessage";
import { Settings } from "./settings";
import { log } from "console";

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

//Declaration merging
interface Warrios {
  weapon: string;
  skills: number;
}

interface Warrios {
  name: string;
}

let ninja: Warrios = {
  weapon: "Shuriken",
  skills: 5,
  name: "Manny",
};

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

app.get("/", (req: Request, res: Response): any => res.send(ninja));

app.listen(Settings.PORT, () => console.log(myName, messages.messagePrint()));

//disposable example

class Resource implements AsyncDisposable {
  constructor(private name: string) {
    console.log(`${this.name} initialized`);
  }

  async [Symbol.asyncDispose](): Promise<void> {
    console.log(`${this.name} clean up`);
  }
}

// Route
app.get("/resource-demo", async (req: Request, res: Response) => {
  const resource = new Resource("Demo Resource");
  console.log("Using resource...");
  await resource[Symbol.asyncDispose]();
  res.send("Resource demo complete. Check your logs");
});
