// Clase Principal
class ProductComponent {
    constructor(name) {
        this.name = name;
    }

    getDetail() {
        return this.name;
    }
}

//decorator principal que es un envoltorio, nunca será utilizada, se utilizarán clases que hereden de esta
class ProductDecorator {
    constructor(productComponent) {
        this.productComponent = productComponent;
    }

    getDetail() {
        return this.productComponent.getDetail();
    }
}

class CommercialInfoProductDecorator extends ProductDecorator {
    constructor(productComponent, tradeName, brand) {
        super(productComponent);
        this.tradeName = tradeName;
        this.brand = brand;
    }

    getDetail() {
        return `${super.getDetail()} - ${this.tradeName} - ${this.brand}`;
    }
}

class StoreProductDecorator extends ProductDecorator {
    constructor(productComponent, price) {
        super(productComponent);
        this.price = price;
    }

    getDetail() {
        return `${super.getDetail()} - $${this.price}`;
    }
}

class HTMLProductDecorator extends ProductDecorator {
    getDetail() {
        return `
        <h1>Información del producto</h1>
        <p>${super.getDetail()}</p>
        `;
    }
}

//Execute
const productComponent = new ProductComponent('Cerveza');
console.log('1 -', productComponent.getDetail());

//decorator 1
const commercialInfoProductDecorator = new CommercialInfoProductDecorator(
    productComponent,
    'Duff',
    'Polar'
);
console.log('2 -', commercialInfoProductDecorator.getDetail());

//decorator 2
const storeProductDecorator = new StoreProductDecorator(productComponent, 10);
console.log('3 -', storeProductDecorator.getDetail());

//decorator 2
const storeProductDecorator2 = new StoreProductDecorator(
    commercialInfoProductDecorator,
    10
);
console.log('4 -', storeProductDecorator2.getDetail());

//decorator 3

const htmlProductDecorator3 = new HTMLProductDecorator(storeProductDecorator2);
const wrapper1 = htmlProductDecorator3.getDetail();
console.log('5 -', wrapper1);

myDiv1.innerHTML = wrapper1;

const htmlProductDecorator4 = new HTMLProductDecorator(
    new StoreProductDecorator(
        new CommercialInfoProductDecorator(productComponent, 'Brahma', 'Polar'),
        8
    )
);
const wrapper2 = htmlProductDecorator4.getDetail();
console.log('6 -', wrapper2);

myDiv2.innerHTML = wrapper2;
