console.log("caso practico");

console.log({content, slcOptions});

const COUNTRIES = [
  {
    code: "US",
    name: "Estados Unidos"
  },
  {
    code: "IT",
    name: "Italia"
  },
  {
    code: "GB",
    name: "Reino Unido de Gran Bretaña"
  },
  {
    code: "CA",
    name: "Canadá"
  },
];

const DATA = [
  {
    name: "Axl Rose",
    description: "William Bruce Rose Jr. (Lafayette, Indiana; 6 de febrero de 1962), originalmente William Bruce Bailey, conocido artísticamente como Axl Rose, es un cantante, compositor y pianista estadounidense.​ Es el líder y vocalista de la banda de hard rock Guns N' Roses, con la que tuvo gran éxito alrededor del mundo a finales de las décadas de 1980 y principios de los 1990.",
    image: "./imgs/artists/axl-rose.jpg",
    countryCode: "US",
  },
  {
    name: "Damiano David",
    description: "Damiano David (Roma, 8 de enero de 1999)1​ es un cantante y compositor italiano conocido por ser el vocalista de la banda de rock italiana Måneskin, que ganó el Festival de Música de Sanremo 2021 y el Festival de la Canción de Eurovisión 2021 (como representante de Italia en este último) con la canción «Zitti e buoni».",
    image: "./imgs/artists/damiano-david.jpg",
    countryCode: "IT",
  },
  {
    name: "The Weeknd",
    description: "Abel Makkonen Tesfaye (Toronto, Canadá; 16 de febrero de 1990), conocido profesionalmente como The Weeknd, es un cantante, compositor y productor discográfico canadiense.​ Conocido por su versatilidad sónica y lirismo oscuro, su música explora el escapismo, el romance y la melancolía, y a menudo se inspira en experiencias personales.",
    image: "./imgs/artists/the-weeknd.jpg",
    countryCode: "CA",
  },
  {
    name: "Sam Ryders",
    description: "Sam Ryder (Essex, 25 de junio de 1989)1​ es un cantante británico que representó al Reino Unido en el Festival de la Canción de Eurovisión 2022 con la canción \"Space Man\".",
    image: "./imgs/artists/sam-ryders.jpg",
    countryCode: "GB",
  },
];


// La clase Context
class InformationContext {

  constructor(strategy, data, element) {
    this.setStrategy(strategy);
    this.data = data;
    // es el div que tiene el id="content"
    this.element = element;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  // Action
  show(){
    console.log("Start InformationContext.show()")
    this.strategy.show(this.data, this.element);
  }
}

// Strategy1
class ListStrategy {

  show(data, element) {
    console.log("Start class ListStrategy.show()", {data, element})

    element.innerHTML = data.reduce((acumulator, item)=>{

      return acumulator + `
        <div class="img-and-name-container">
          <div class="list-name-and-flag">
            <h2 class="flex-item item-name">${item.name}</h2>
            <img class="flex-item country-flag" alt="country-flag-${item.countryCode}" src="https://flagsapi.com/${item.countryCode}/shiny/64.png" alt="">
          </div>
        </div>
      <hr>`
    }, "");

    console.log("Finish class ListStrategy.show()", {data, element})
  }
}

// Strategy2
class DetailedListStrategy {

  show(data, element) {
    console.log("Start class ListStrategy.show()", {data, element})
    element.innerHTML = data.reduce((acumulator, item)=>{

      const country = COUNTRIES.find((country)=> (country.code === item.countryCode));

      return acumulator + `
        <div class="img-and-name-container">
          <div class="list-name-and-flag">
            <h2 class="flex-item item-name">${item.name}</h2>
            <img class="flex-item country-flag" alt="country-flag-${item.countryCode}" src="https://flagsapi.com/${item.countryCode}/shiny/64.png" alt="">
          </div>
          <p class="country-name"> ${country.name}</p>
        </div>
        <p class="item-description">${item.description}</p>
      <hr>`
    }, "");

    console.log("Finish class ListStrategy.show()", {data, element})
  }
}

// Strategy3
class ListWithImageStrategy {

  show(data, element) {
    console.log("Start class ListStrategy.show()", {data, element})
    element.innerHTML = data.reduce((acumulator, item)=>{

      return acumulator + `
        <div class="img-and-name-container">
          <div class="list-name-and-flag">
            <h2 class="flex-item item-name">${item.name}</h2>
            <img class="flex-item country-flag" alt="country-flag-${item.countryCode}" src="https://flagsapi.com/${item.countryCode}/shiny/64.png" alt="">
          </div>
          <img class="item-image" src=${item.image} >
        </div>
      <hr>`
    }, "");

    console.log("Finish class ListStrategy.show()", {data, element})
  }
}

const listStrategy = new ListStrategy();
const detailedStrategy = new DetailedListStrategy();
const listWithImageStrategy = new ListWithImageStrategy();

const infoContext = new InformationContext(listStrategy, DATA, content );
infoContext.show();

const strategies = [
  {
    strategy: listStrategy,
    value: "list-strategy"
  },
  {
    strategy: detailedStrategy,
    value: "detailed-list-strategy"
  },
  {
    strategy: listWithImageStrategy,
    value: "list-image-strategy"
  },
];


slcOptions.addEventListener("change", (event)=>{
  const option = event.target.value;
  const selectedStrategy = strategies.find(strategy=> strategy.value === option);
  infoContext.setStrategy(selectedStrategy.strategy);
  infoContext.show();
});

