// Clase Contexto con una Strategy y una Action,
// La Action ejecutara lo que tenga la Strategy

// En el ejemplo haremos una venta que dependiendo de la estrategia realizaremos un calculo distinto

class SaleContext {
  
  // La strategy es un objeto con un método, que se ejecutara
  constructor(strategy) {
    this.strategy = strategy;
  };

  // La Action que realizara este contexto es calcular, calcular algo que todavia no sabemos como

  calculate(amount) {
    // La Strategy que hemos de recibir tendra un metodo que se llame calculate que recibira un monto
    return this.strategy.calculate(amount);
  }

  // ahora agregamos un metodo para cambiar la Strategy, para poderle cambiar la estrategia mi objeto Venta

  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
}

// Venta Regular con IVA
class RegularSaleStrategy {

  constructor(tax) {
    this.tax = tax
  }

  calculate(amount) {
    return amount + (amount * this.tax);
  }

}

const IVA_TAX = 0.16;
const DISCOUNT = 3;

const regularSaleStrategy = new RegularSaleStrategy(IVA_TAX);

const sale = new SaleContext(regularSaleStrategy);
const total = sale.calculate(10);

// console.log("Total de mi venta regular con impuesto IVA: ", total);

// Venta con descuento e IVA
class DiscountSaleStrategy {

  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    return amount + (amount * this.tax) - (this.discount);
  }

}

const discountSaleStrategy = new DiscountSaleStrategy(IVA_TAX, DISCOUNT);
const sale2 = new SaleContext(discountSaleStrategy);
const total2 = sale2.calculate(15);

// console.log("Total de mi venta con impuesto IVA y descuento: ", total2);

//Supongamos que la tasa de cambio viene de una API externa
class ForeignSaleStrategy {

  calculate(amount) {
    return amount * this.getDollarPrice();
  }

  getDollarPrice(){
    return 1/20;
  }
}

const foreignSaleStrategy = new ForeignSaleStrategy();

const calculateTotal = (sale, amount) => sale.calculate(amount).toFixed(2);

const AMOUNTS = [10, 15, 25, 30, 40];
const STRATEGIES = [
  {
    strategy: regularSaleStrategy,
    message: "con venta regular"
  },
  {
    strategy: discountSaleStrategy,
    message: "con venta con descuento"
  },
  {
    strategy: foreignSaleStrategy,
    message: "en moneda extranjera"
  }
];


AMOUNTS.forEach(amount => {

  STRATEGIES.forEach(e => {

    /** Cambiando de estrategias usando setStrategy */
    sale.setStrategy(e.strategy);
    console.log(`Esta es mi venta de $${amount} ${e.message}: $${calculateTotal(sale, amount)}`);
  });


});



