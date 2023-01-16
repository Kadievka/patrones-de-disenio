class Subject {

  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.refresh(data));
  }
}

class Observer {

  constructor(fn) {
    this.fn = fn;
  }

  refresh(data) {
    this.fn(data);
  }
}

const subject = new Subject();

function logMessage(data) {
  //console.log("Start Observer 1 muestra el valor del input", data);
  div1.innerHTML = data;
}

function countCharacters(data) {
  //console.log("Start Observer 2 cuenta cuantos caracteres hay en input", data.length);
  div2.innerHTML = data.length;
}

function reverseCharacters(data) {
  div3.innerHTML = data.split("").reverse().join("");
}

const observer1 = new Observer(logMessage);
const observer2 = new Observer(countCharacters);
const observer3 = new Observer(reverseCharacters);

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);

function change() {
  // myTextInput.value es igual a data
  subject.notify(myTextInput.value)
}