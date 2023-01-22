interface PersonInterface {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];
}

class Person {

  private name: string;
  private lastName: string;
  private age: number;
  private country: string;
  private city: string;
  private hobbies: string[];

  constructor(person: PersonInterface) {
    this.name = person.name;
    this.lastName = person.lastName;
    this.age = person.age;
    this.country = person.country;
    this.city = person.city;
    this.hobbies = person.hobbies;
  }

  getFullName(): string {

    let nameQuote = `Hola, mi nombre es ${this.name}`;
    let lastNameQuote = ` ${this.lastName}.`;

    if(!this.name){

      nameQuote = "no tengo nombre, ";
      
      lastNameQuote = this.lastName ? `pero mi apellido es ${this.lastName}.` : "tampoco tengo apellido.";
    }else if(!this.lastName){
      lastNameQuote = ", no tengo apellido."
    }

    return `${nameQuote}${lastNameQuote}`;
  }

  getAge(): string {
    if(!this.age) return `todavía no hay datos sobre mi edad.`;
    return `tengo ${this.age} años.`;
  }

  getAddress(): string {

    let countryQuote = `Soy de ${this.country}`;
    let cityQuote = ` y vivo en ${this.city}.`;

    if(!this.country){

      countryQuote = "aún no existen datos de mi país";
      
      cityQuote = this.city ? `, pero puedo decir que vivo en ${this.city}.` : ", tampoco hay datos sobre mi ciudad.";
    }else if(!this.city){
      cityQuote = ", pero no hay datos de la ciudad donde vivo."
    }

    return `${countryQuote}${cityQuote}`;
  }

  getHobbies(): string {
    if(!this.hobbies.length) return `Estoy en búsqueda de un hobby.`;

    if(this.hobbies.length > 1 ){
      const hobbies: string = this.hobbies.reduce((acc, hobby, i) => {
        if(i === this.hobbies.length - 2) return acc + hobby;
        if(i === this.hobbies.length - 1) return acc + " y " + hobby;
        return acc + hobby + ", ";
      }, "");
    return `Las actividades que más disfruto hacer son: ${hobbies}.`;
    }

    return `Tengo una sola pasión que es ${this.hobbies[0]}.`;
  }

  getInfo() {
    console.log(this.getFullName());
    console.log(this.getAge());
    console.log(this.getAddress());
    console.log(this.getHobbies());
    console.log("---------------------------------------------------------------------------");
  }
}

interface PersonBuilderInterface extends PersonInterface {

  setName(name: string): PersonBuilderInterface;
  setLastName(lastName: string): PersonBuilderInterface;
  setAge(age: number): PersonBuilderInterface;
  setCountry(country: string): PersonBuilderInterface;
  setCity(city: string): PersonBuilderInterface;
  addHobby(hobby: string): PersonBuilderInterface;

  reset(): void;
  build(): Person;
}


class NormalPersonBuilder implements PersonBuilderInterface {

  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  constructor() {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  reset(): void {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }
  
  setName(name: string): PersonBuilderInterface {
    this.name = name;
    return this;
  }
  setLastName(lastName: string): PersonBuilderInterface {
    this.lastName = lastName;
    return this;
  }
  setAge(age: number): PersonBuilderInterface {
    this.age = age;
    return this;
  }
  setCountry(country: string): PersonBuilderInterface {
    this.country = country;
    return this;
  }
  setCity(city: string): PersonBuilderInterface {
    this.city = city;
    return this;
  }
  addHobby(hobby: string): PersonBuilderInterface {
    this.hobbies.push(hobby);
    return this;
  }


  build(): Person {
    const person = new Person(this);
    this.reset();
    return person;
  }
}

class PersonDirector {
  private personBuilder: PersonBuilderInterface;

  constructor (personBuilder: PersonBuilderInterface) {
    this.personBuilder = personBuilder;
  }

  setPersonBuilder(personBuilder: PersonBuilderInterface) {
    this.personBuilder = personBuilder;
  }

  createSimplePerson(name: string, lastName: string) {
    this.personBuilder.setName(name);
    this.personBuilder.setLastName(lastName);
  }
}

const personBuilder = new NormalPersonBuilder();

const hector = personBuilder
  .addHobby("nadar")
  .addHobby("pescar")
  .addHobby("cocinar")
  .setAge(15)
  .setCity("Caracas")
  .setCountry("Venezuela")
  .setName("Hector")
  .setLastName("Gonzalez")
  .build();
hector.getInfo();

const ana = personBuilder
  .setName("Ana")
  .setCountry("Estados Unidos")
  .setAge(20)
  .build();
ana.getInfo();

const juan = personBuilder
  .setName("Juan")
  .addHobby("leer")
  .setCity("Madrid")
  .build();
juan.getInfo();

const lopez = personBuilder
  .setLastName("Lopez")
  .addHobby("leer")
  .addHobby("cantar")
  .build();
lopez.getInfo();

const nadie = personBuilder
  .build();
nadie.getInfo();

//

const normalPersonDirector = new PersonDirector(personBuilder);
normalPersonDirector.createSimplePerson("John", "Doe");

const jhon = personBuilder.build();
jhon.getInfo();