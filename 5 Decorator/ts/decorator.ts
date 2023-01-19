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

  protected component?: ComponentInterface;

  constructor(component?: ComponentInterface) {
    this.component = component;
  }

  getDetail(): string {
    return this.component ? this.component.getDetail() : "";
  };

}

//decorator 1
class CommercialProductDecorator extends ProductDecorator {

  private tradename: string;
  private brand: string;

  constructor(tradename: string, brand: string, component?: ComponentInterface) {
    super(component);
    this.tradename = tradename;
    this.brand = brand;
  }

  getDetail(): string{
    return `${this.tradename} ${this.brand} ${this.component ? this.component.getDetail() : ""}`;
  }
}

//decorator 2
class StoreProductDecorator extends ProductDecorator {

  private price: number;

  constructor(price: number, component?: ComponentInterface) {
    super(component);
    this.price = price;
  }

  getDetail(): string{
    return `${this.price}$ ${this.component ? this.component.getDetail() : ""}`;
  }
}

class NameComponent extends ProductDecorator {

  protected name: string;
  protected component?: ComponentInterface;

  constructor(name: string, component?: ComponentInterface) {

    super(component);

    this.name = name;
    this.component = component;
  }

  getDetail(): string {
    return `${this.name}$ ${this.component?.getDetail()}`
  };
}

// execute 

const productComponent = new DetailComponent("Cerveza");
console.log(productComponent.getDetail());

const commercialProductDecorator = new CommercialProductDecorator("London Porter", "Fuller's", productComponent);
console.log(commercialProductDecorator.getDetail());

const storeProductDecorator = new StoreProductDecorator(25, commercialProductDecorator);
console.log(storeProductDecorator.getDetail());

const storeProductDecorator2 = new StoreProductDecorator(13, productComponent);
console.log(storeProductDecorator.getDetail());

const commercialProductDecorator2 = new CommercialProductDecorator("New Others", "Names", storeProductDecorator);
console.log(commercialProductDecorator2.getDetail());

const commercialProductDecorator3 = new CommercialProductDecorator("New Others", "Names", storeProductDecorator2);
console.log(commercialProductDecorator3.getDetail());

const storeProductDecorator3 = new StoreProductDecorator(5, productComponent);
console.log(storeProductDecorator3.getDetail());

const nameComponent = new NameComponent("Cerveza", new StoreProductDecorator(15));
console.log(nameComponent.getDetail());

const nameComponent2 = new NameComponent("Cerveza", new CommercialProductDecorator("London Porter", "Fuller's", new StoreProductDecorator(15)));
console.log(nameComponent2.getDetail());