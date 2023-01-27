interface ListImplementor {

  elements: number[];

  add(number: number): void;
  getElements(): number[];

}

class OrderedList implements ListImplementor {

  elements: number[] = [];

  public add(number: number): void {
    this.elements.push(number);
    this.elements.sort((a, b) => a - b);

  }

  getElements(): number[] {
    return this.elements;
  }

}

class UniqueList implements ListImplementor {

  elements: number[] = [];

  public add(number: number): void {
    if (!this.elements.includes(number)) this.elements.push(number);
  }

  getElements(): number[] {
    return this.elements;
  }

}

// This is the Concept of Bridge
interface DataAbstraction {
  implementor: ListImplementor;
  executeAdd(number: number): void;
  executeGet(): number[];
  operation(fn: (n: number) => number): number[];

}

class DataRefinedAbstraction implements DataAbstraction {

  implementor: ListImplementor;

  constructor(implementor: ListImplementor) {
    this.implementor = implementor;

  }

  executeAdd(number: number): void {
    this.implementor.add(number);
  }

  executeGet(): number[] {
    return this.implementor.getElements();
  }

  operation(fn: (n: number) => number): number[] {
    const numbers = this.executeGet();
    return numbers.map(number => fn(number));
  }


}

const MY_NUMBERS: number[] = [2, 3, 14, 5, 3, 3, 3, 3, 5, 67, 10, 53];

const uniqueList = new DataRefinedAbstraction(new UniqueList());
const orderedList = new DataRefinedAbstraction(new OrderedList());

MY_NUMBERS.forEach(number => uniqueList.executeAdd(number));
MY_NUMBERS.forEach(number => orderedList.executeAdd(number));

console.log(
  "UniqueList",
  uniqueList.executeGet(),
  uniqueList.operation((number) => number * 2),
)

console.log(
  "OrderedList",
  orderedList.executeGet(),
  orderedList.operation((number) => number + 1),
)

const orderedList2 = new DataRefinedAbstraction(new OrderedList());

console.log({orderedList2: orderedList2.executeGet()})

uniqueList.executeGet().forEach(number => orderedList2.executeAdd(number));
console.log(
  "OrderedList2",
  orderedList2.executeGet(),
)