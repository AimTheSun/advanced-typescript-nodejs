"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Messenger {
    port;
    environment;
    constructor(port, environment) {
        this.port = port;
        this.environment = environment;
    }
    messagePrint() {
        return `Node and express server is running on port ${this.port} in ${this.environment}`;
    }
}
exports.default = Messenger;
