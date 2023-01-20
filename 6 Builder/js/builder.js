// Un Objeto cualquiera que tendra muchas propiedades
class Person {
  constructor(firstName, lastName, age, hobbies, country, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.hobbies = hobbies;
    this.country = country;
    this.city = city;
  }

  //métodos propios que no tiene que ver con el patrón...

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Constructor con las mismas propiedades
class PersonBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.firstName = '';
    this.lastName = '';
    this.age = 0;
    this.hobbies = [];
    this.country = '';
    this.city = '';
  }

  setFirstName(name) {
    this.firstName = name;
    // con return this, encadenamos metodos
    return this;
  }

  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
    return this;
  }

  setCountry(country) {
    this.country = country;
    return this;
  }

  setCity(city) {
    this.city = city;
    return this;
  }

  //metodo build
  build() {
    const person = new Person(
      this.firstName,
      this.lastName,
      this.age,
      this.hobbies,
      this.country,
      this.city
    );
    this.reset();
    return person;
  }
}

// Construir una persona
const personBuilder = new PersonBuilder();

// Podemos encadenar métodos porque cada uno retorna la misma clase con sus métodos
const person1 = personBuilder
  .setFirstName('Anita')
  .setLastName('Suarez')
  .addHobby('shopping')
  .addHobby('comer')
  .build();
console.log({ person1 });

const person2 = personBuilder
  .setFirstName('Juan')
  .setAge(20)
  .build();
console.log({ person2 });