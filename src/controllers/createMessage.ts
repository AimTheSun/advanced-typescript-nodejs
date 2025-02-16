namespace Messagespace {
  export type Environment = "development" | "production" | "staging";

  function LogExecution(
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log("Calling Messenger");
      return originalMethod.apply(this, args);
    };
  }

  export class Messenger {
    port: number;
    environment: Environment;

    constructor(port: number, environment: Environment) {
      this.port = port;
      this.environment = environment;
    }

    @LogExecution
    messagePrint() {
      return `Node and express server is running on port ${this.port} in ${this.environment}`;
    }
  }
}

export default Messagespace;
