"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const crmRoutes_1 = __importDefault(require("./src/routes/crmRoutes"));
const createMessage_1 = __importDefault(require("./src/controllers/createMessage"));
const app = (0, express_1.default)();
//number type
const PORT = 3000;
// string type
const database = "mongodb://localhost/CRMdb";
//array
//let simpleArray: number[] = [1, 2, 3, 4];
// instance messenger class
let messages = new createMessage_1.default(PORT);
// mongoose connection
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(database);
// bodyparser setup
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
(0, crmRoutes_1.default)(app);
// serving static files
app.use(express_1.default.static("public"));
app.get("/", (req, res) => res.send(messages.messagePrint()));
app.listen(PORT, () => console.log(messages.messagePrint()));
