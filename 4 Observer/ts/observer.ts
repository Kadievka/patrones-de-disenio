// T es un alias y se puede usar cualquier letra o oalabra, pero la convención es T
// Significa que el Type es un generic

interface ObserverInterface <T> {

  refresh(value: T): void;

}

interface SubjectInterface <T> {

  observers : ObserverInterface<T>[];

  subscribe(observer: ObserverInterface<T>): void;

  unsubscribe(observer: ObserverInterface<T>): void;

  notify(value: T): void;

}

class Subject<T> implements SubjectInterface<T> {

  observers: ObserverInterface<T>[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: ObserverInterface<T>) {
    this.observers.push(observer);
  }

  unsubscribe(observer: ObserverInterface<T>) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data: T) {
    this.observers.forEach(observer => observer.refresh(data));
  }
}

class Observer<T> implements ObserverInterface<T> {

  private fn: (value: T) => void;

  constructor(fn: (value: T) => void) {
    this.fn = fn;
  }

  refresh(data: T) {
    this.fn(data);
  }
}


//Aqui es donde T se convierte en string, si lo cambiamos a number veremos que muchas cosas van a marcar un error
const subject1 = new Subject<string>();

function logMessage(data: string) {
  console.log("Start Observer 1 muestra el valor del input", data);
}

function countCharacters(data: string) {
  console.log("Start Observer 2 cuenta cuantos caracteres hay en input", data.length);
}

function reverseCharacters(data: string) {
  console.log("Start Observer 3 muestra el valor del input invertido", data.split("").reverse().join(""));
}

function logCustomerNumber(data: StatisticsInterface) {
  console.log(`El numero de nuestros clientes es de ${data.customers}` );
}

function logSalesNumber(data: StatisticsInterface) {
  console.log(`Nuestras ventas totales son de ${data.sales} productos` );
}

const observer1 = new Observer(logMessage);
const observer2 = new Observer(countCharacters);
const observer3 = new Observer(reverseCharacters);

subject1.subscribe(observer1);
subject1.subscribe(observer2);
subject1.subscribe(observer3);

subject1.notify("Kadievka");

/***************************** */
interface StatisticsInterface {
  customers: number;
  sales: number
}

const subject2 = new Subject<StatisticsInterface>();

const observer4 = new Observer(logCustomerNumber);
const observer5 = new Observer(logSalesNumber);

subject2.subscribe(observer4);
subject2.subscribe(observer5);

const statistics: StatisticsInterface = {
  customers: 1200536,
  sales: 305400008
}
subject2.notify(statistics);
