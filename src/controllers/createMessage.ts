namespace Messagespace {
  export type Environment = "development" | "production" | "staging";

  export class Messenger {
    port: number;
    environment: Environment;

    constructor(port: number, environment: Environment) {
      this.port = port;
      this.environment = environment;
    }

    messagePrint() {
      return `Node and express server is running on port ${this.port} in ${this.environment}`;
    }
  }
}

export default Messagespace;