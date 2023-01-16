console.log("Hola desde typescript sin compilar nada usando ts-node")

// Clases y Objetos

class Drink implements Product{

  cant: number;
  name: string;
  price: number;

  constructor(cant: number, drinkName: string, price: number) {
    this.cant = cant
    this.name = drinkName;
    this.price = price;
  }

  showName(): string {
    console.log(this.name)
    return this.name;
  }

  getPrice(): string {
    return `El precio de la bebida ${this.name} es: $${this.price}`;
  }

}

const drink = new Drink(1, "gatorade", 0.8);
drink.showName();

class Juice extends Drink {

  private sugarGrs: number;
  
  constructor(cant: number, juiceName: string, sugarGrs: number, price: number) {
    super(cant, juiceName, price);
    this.sugarGrs = sugarGrs;
  }

  showNutritionally(): [string, number] {
    console.log(`Nutritionally grs: ${this.sugarGrs} of the ${this.name} juice`)
    return [this.name, this.sugarGrs];
  }

  getPrice(): string {
    return `El precio del jugo de ${this.name} es: $${this.price}`;
  }

};

const juice = new Juice(1, "Piña", 10., 0.6);
juice.showName();
juice.showNutritionally();

// Interfaces

interface Product {
  cant: number;
  name: string;
  price: number;
  getPrice(): string;
}

console.log(juice.getPrice());
console.log(drink.getPrice());

class Snack implements Product {
  cant: number;
  price: number;
  name: string;

  constructor(cant: number, name: string, price: number) {
    this.cant = cant;
    this.price = price;
    this.name = name;
  };

  getPrice(): string {
    const result: string = `El precio del snack es: $${this.price}`;
    console.log(result);
    return result;
  };
}

const snack = new Snack(1, "snack", 1.12);
snack.getPrice();

console.log("-----------------------------------");
const products: Product[] = [
  new Drink(1, "Pepsi", 2.00),
  new Juice(2, "Plátano", 0.56, 1.5),
  new Snack(1, "Doritos", 2.25),
  {cant: 5, name: "frutas varias", price: 0.50, getPrice(){return this.price.toString()}},
];

products.map(product=>{
  console.log(`${product.cant} ${product.name}: $${product.price}`);
});
const cant: number = products.reduce((acc, product) => (acc + product.cant), 0)
const total: number = products.reduce((acc, product)=>(acc + (product.cant * product.price)), 0)
console.log(`cant: ${cant} total: ${total}}`);
console.log("-----------------------------------");