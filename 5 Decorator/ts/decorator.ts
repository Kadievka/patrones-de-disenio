interface ComponentInterface {
  getDetail(): string;
}

class DetailComponent implements ComponentInterface {

  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  getDetail(): string{
    return this.name;
  };
}

abstract class ProductDecorator implements ComponentInterface {

  protected component: ComponentInterface;

  constructor(component: ComponentInterface) {
    this.component = component;
  }

  getDetail(): string{
    return this.component.getDetail();
  };

}

//decorator 1
class CommercialProductDecorator extends ProductDecorator {

  private tradename: string;
  private brand: string;

  constructor(component: ComponentInterface, tradename: string, brand: string) {
    super(component);
    this.tradename = tradename;
    this.brand = brand;
  }

  getDetail(): string{
    return `${this.tradename} ${this.brand} ${this.component.getDetail()}`;
  }
}

//decorator 2
class StoreProductDecorator extends ProductDecorator {

  private price: number;

  constructor(component: ComponentInterface, price: number) {
    super(component);
    this.price = price;
  }

  getDetail(): string{
    return `${this.price}$ ${this.component.getDetail()}`;
  }
}

// execute 

const productComponent = new DetailComponent("Cerveza");
console.log(productComponent.getDetail());

const commercialProductDecorator = new CommercialProductDecorator(productComponent, "London Porter", "Fuller's");
console.log(commercialProductDecorator.getDetail());

const storeProductDecorator = new StoreProductDecorator(commercialProductDecorator, 25);
console.log(storeProductDecorator.getDetail());

const storeProductDecorator2 = new StoreProductDecorator(productComponent, 13);
console.log(storeProductDecorator.getDetail());

const commercialProductDecorator2 = new CommercialProductDecorator(storeProductDecorator, "New Others", "Names");
console.log(commercialProductDecorator2.getDetail());

const commercialProductDecorator3 = new CommercialProductDecorator(storeProductDecorator2, "New Others", "Names");
console.log(commercialProductDecorator3.getDetail());

const storeProductDecorator3 = new StoreProductDecorator(productComponent, 5);
console.log(storeProductDecorator3.getDetail());