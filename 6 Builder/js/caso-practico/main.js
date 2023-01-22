class Form {
  constructor(controls, action) {
    this.controls = controls;
    this.action = action;
  }

  // Es funcionalidad, no es del patrón builder
  getContent() {
    const result = `<form method="post" action="${this.action}">
    ${this.controls.reduce((accumulator, control) => {
      return `${accumulator} <div>
        ${this.getLabel(control)}
        ${this.getInput(control)}
      </div>`;
    }, "")}
      <button type="submit">Enviar</button>
    </form>`;
    console.log({ result });
    return result;
  }

  getLabel(control) {
    return `<label>${control.text}</label>`;
  }

  getInput(control) {
    return `<input name="${control.name}" type="${control.type}" />`;
  }
}

class FormBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.action = "";
    this.controls = [];
  }

  setAction(action) {
    this.action = action;
    return this;
  }

  //construye cajas de texto
  setText(name, text) {
    this.controls.push({ name, text, type: "text" });
    return this;
  }

  //podemos optimizar todos estos metodos en uno solo, pero es un ejemplo para tener varias funciones para concaternalas
  setEmail(name, text) {
    this.controls.push({ name, text, type: "email" });
    return this;
  }

  setCheckBox(name, text) {
    this.controls.push({ name, text, type: "checkbox" });
    return this;
  }

  setColor(name, text) {
    this.controls.push({ name, text, type: "color" });
    return this;
  }

  build() {
    const form = new Form(this.controls, this.action);
    this.reset();
    return form;
  }
}

//para muchos formularios del mismo tipo
class FormDirector {
  constructor(formBuilder) {
    this.setFormBuilder(formBuilder);
  }

  setFormBuilder(formBuilder) {
    this.formBuilder = formBuilder;
  }

  createPeopleForm() {
    this.formBuilder.reset();
    this.formBuilder
      .setText("lastName", "Apellidos")
      .setText("firstName", "Nombre");
  }

  createContactForm() {
    this.formBuilder.reset();
    this.formBuilder
      .setText("nameFriend", "Nombre del interesado")
      .setEmail("email", "Correo Electrónico")
      .setText("message", "Mensaje");
  }

  createCompleteForm() {
    this.formBuilder.reset();
    this.formBuilder
      .setText("lastName", "Apellidos")
      .setText("firstName", "Nombre")
      .setText("nameFriend", "Nombre del interesado")
      .setEmail("email", "Correo Electrónico")
      .setText("message", "Mensaje")
      .setCheckBox("acceptTerms", "Acepto los terminos y condiciones")
      .setColor("favoriteColor", "Color favorito")
      .setAction("signIn.php");
  }
}

const formBuilder = new FormBuilder();
const formPeople = formBuilder
  .setAction("add.php")
  .setText("firstName", "Nombre")
  .setText("lastName", "Apellidos")
  .setCheckBox("acceptTerms", "Acepto los terminos y condiciones")
  .setColor("favoriteColor", "Color favorito")
  .build();

//console.log({formPeople});

form1.innerHTML = formPeople.getContent();

const formEmail = formBuilder
  .setAction("send.php")
  .setEmail("Email", "Correo electrónico")
  .build();

form2.innerHTML = formEmail.getContent();

//continuación parte II

const director = new FormDirector(formBuilder);
director.createPeopleForm();

director.createPeopleForm();
form3.innerHTML = formBuilder.build().getContent();

director.createContactForm();
form4.innerHTML = formBuilder.build().getContent();

director.createCompleteForm();
form5.innerHTML = formBuilder.build().getContent();
