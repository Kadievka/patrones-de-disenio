console.log("Hola mundo");

function sum(a,b){
  return a + b ;
}

//Función de primer orden: se guarda en una variable, se llama y se puede pasar como parçametro de otra función
let res = sum(1,2);

console.log({res})

const fSum = sum;

res = fSum(5,6)

console.log({res})

// Función de segundo orden: puede recibir como parámetros otras funciones
function operation(fn, a, b){
  console.log("Se hace algo");
  const result = fn(a,b);
  console.log({result})
}

operation(sum, 2, 3);

// Arrow function
let arrowF = ()=>{
  console.log("algo")
}

arrowF();

operation((a, b)=>{
  const result = a*b
  console.log(`Recibiendo ${a} x ${b} = ${result}` );
  return result;
}, 9, 6)

// arrays

const names = ["Ana", "Bella", "Carla", "Denna", "Elena"];
names.forEach((name)=>{
  console.log(name);
  console.log(name.toUpperCase())
})

// map
const upperNames = names.map(name=>(name.toUpperCase));
console.log({names, upperNames});

// reduce
const initValue = 1;
const numbers = [5, 4, 7, 1, 10];
const total = numbers.reduce((aux, number)=>{
  console.log({aux, number});
  const result = aux + number;
  console.log({result});
  return result;
}, initValue);
console.log({numbers, total})

console.log({oneLine: numbers.reduce(((aux, number)=>(aux + number)), 0)});

// Clases y Objetos

class Drink {

  constructor(drinkName){
    this.name = drinkName;
  }

  showName(){
    console.log(this.name)
  }

}

const drink = new Drink("coca-cola");
drink.showName()

// Functional
function Drink2(drinkName){
  this.name = drinkName;
  this.showName = ()=>console.log(`La bebida es ${drinkName}`)
}

const drink2 = new Drink2("agua");
drink2.showName();

class Beer extends Drink {

  constructor(beerName, alcoholPercentage){
    //Hereda la propiedad del constructor de la clase padre Drink
    super(beerName);
    this.alcohol = alcoholPercentage;
  }

  showValues(){
    console.log({
      name: this.name,
      alcoholPercentage: this.alcohol
    });
  }

};

const beer = new Beer("duff", "6%")
beer.showValues();
beer.showName();









