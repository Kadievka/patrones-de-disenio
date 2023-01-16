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

class ItemsSubject extends Subject {

  constructor() {
    super();

    this.data = [];
  }

  add(item) {
    this.data.push(item);
    this.notify(this.data);
  }
}

class HtmlElementObserver {

  constructor(element) {
    this.element = element;
  }

  refresh(data) {
    this.element.innerHTML = data.reduce((acu, item) => acu + `<p>${[item]}</>`, "");
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

const itemSubject = new ItemsSubject();

const observer1 = new HtmlElementObserver(div1);
const observer2 = new Observer((data)=>{
  div2.innerHTML = data.length;
});
const observer3 = new Observer(()=>{
  div3.innerHTML = textName.value.length;
});

itemSubject.subscribe(observer1);
itemSubject.subscribe(observer2);
itemSubject.subscribe(observer3);

function add() {
  const name = textName.value;
  itemSubject.add(name)
}