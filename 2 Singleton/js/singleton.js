console.log("Hello world!");

class Singleton {

  constructor() {
    console.log("constructor init");
    this.random = Math.random();
    console.log("watch this: ", {random: this.random});
  };

  static getInstance() {

    if (!Singleton.instance) {
      console.log("first time initialization");
      Singleton.instance = new Singleton();
    }

    console.log("instance already exists");
    return Singleton.instance;
  }

  static deleteInstance() {
    delete Singleton.instance;
  }
}

const singleton1 = Singleton.getInstance();
let singleton2 = Singleton.getInstance();
const singleton3 = Singleton.getInstance();

console.log("Singleton1 random:", singleton1.random);
console.log("Singleton2 random:", singleton2.random);
console.log("Singleton3 random:", singleton3.random);

console.log("singleton1 === singleton2: ", singleton1===singleton2);
console.log("singleton2 === singleton3: ", singleton2===singleton3);

singleton2 = Singleton.getInstance();

console.log("singleton1 === singleton2: ", singleton1===singleton2);
console.log("singleton2 === singleton3: ", singleton2===singleton3);

Singleton.deleteInstance();

console.log("singleton1 === singleton2: ", singleton1===singleton2);
console.log("singleton2 === singleton3: ", singleton2===singleton3);

singleton2 = Singleton.getInstance();

console.log("singleton1 === singleton2: ", singleton1===singleton2);
console.log("singleton2 === singleton3: ", singleton2===singleton3);

class WeekDays {

  daysEs = [
    "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo",
  ];

  daysEn = [
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
  ];

  constructor(lang) {
    this.lang = lang;
  }

  static getInstance(lang) {

    if (!WeekDays.instance) {
      console.log("first time initialization");
      WeekDays.instance = new WeekDays(lang);
    }

    console.log("instance already exists");
    return WeekDays.instance;
  }

  getDays() { 
    this.weekDays = this.lang === "es" ? this.daysEs : this.daysEn;
    return this.weekDays;
  }
}

const weekDays1 = WeekDays.getInstance("es");
console.log("weekDays1:", weekDays1.getDays())

const weekDays2 = WeekDays.getInstance("en");
console.log("weekDays2:", weekDays2.getDays())