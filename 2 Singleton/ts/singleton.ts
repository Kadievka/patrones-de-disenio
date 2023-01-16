class Singleton {

  private static instance?: Singleton;
  random: number;

  private constructor() {
    console.log("constructor init");
    this.random = Math.random();
    console.log("watch this: ", {random: this.random});
  };

  static getInstance(): Singleton {

    if (!this.instance) {
      console.log("first time initialization");
      this.instance = new Singleton();
    }

    console.log("instance already exists");
    return this.instance;
  }

  static deleteInstance(): void {
    delete this.instance;
  }
}

const singleton1 = Singleton.getInstance();
let singleton2 = Singleton.getInstance();
const singleton3 = Singleton.getInstance();

console.log("Singleton1 random:", singleton1.random);
console.log("Singleton2 random:", singleton2.random);
console.log("Singleton3 random:", singleton3.random);