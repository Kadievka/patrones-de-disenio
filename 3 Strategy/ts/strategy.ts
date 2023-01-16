
interface LoginStrategyInterface {
  login(user: string, password: string) : boolean;
}

class LoginContext {

  private strategy: LoginStrategyInterface;

  constructor(strategy: LoginStrategyInterface) {
    this.strategy = strategy;
  }

  setStrategy(strategy: LoginStrategyInterface) {
    this.strategy = strategy;
  }

  login(user: string, password: string) : boolean {
    return this.strategy.login(user, password);
  }
}

const messageFailure: string = "Not logged :(";

class LoginDBStrategy implements LoginStrategyInterface {

  login(user: string, password: string) : boolean {
    console.log(`Start LoginDBStrategy`)

    const isLogged: boolean = (user === "admin" && password === "sign");

    const messageSuccess: string = "Logged as admin!";
    console.log( isLogged ? messageSuccess : messageFailure);

    console.log(`Finish LoginDBStrategy`);
    return isLogged;
  }
}

const loginDBStrategy: LoginStrategyInterface = new LoginDBStrategy();

const loginContext: LoginContext = new LoginContext(loginDBStrategy);
loginContext.login("admin", "sign");

class LoginServiceStrategy implements LoginStrategyInterface {

  login(user: string, password: string) : boolean {
    console.log(`Start LoginServiceStrategy`)

    const isLogged: boolean = (user === "user" && password === "123");

    const messageSuccess: string = "Logged as web service user!";
    console.log( isLogged ? messageSuccess : messageFailure);

    console.log(`Finish LoginServiceStrategy`);
    return isLogged;
  }
}

const loginServiceStrategy: LoginStrategyInterface = new LoginServiceStrategy();

loginContext.setStrategy(loginServiceStrategy);
loginContext.login("admin", "sign");
loginContext.login("user", "123");