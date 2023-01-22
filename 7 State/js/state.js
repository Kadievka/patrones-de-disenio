class DocumentContext {

  // state inicial se pone dentro del constructor
  constructor() {
    //state de este objeto, tiene 3 states: vacío, lleno, aprobado
    this.content = "";
    this.state = new BlankState();
  }

  setState(state) {
    this.state = state;
  }

  write(text) {
    this.state.write(this, text);
  }
}

class BlankState {
  write(documentContext, text) {
    documentContext.content = text;
    documentContext.setState(new WithContentState());
  }
}

class WithContentState {
  write(documentContext, text) {
    documentContext.content += " " + text;
    documentContext.setState(new WithContentState());
  }
}

class ApproveState {
  write() {
    console.log("Documento aprovado, ya no se modifica")
  }
}

const doc = new DocumentContext();
console.log(doc);

doc.write("hola!");
console.log(doc);

doc.write("hola! que tal?");
console.log(doc);

doc.setState(new ApproveState());
console.log(doc);

doc.write("a");

doc.setState(new WithContentState());

doc.write("a");
console.log(doc);
