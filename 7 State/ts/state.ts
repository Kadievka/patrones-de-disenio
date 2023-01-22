interface StateInterface {
  next(ticket: Ticket): number | null;
  add(ticket: Ticket, quantity: number): void;
}

class Ticket {

  private state: StateInterface;
  quantity: number;
  readonly limit: number;
  private number: number;

  constructor(limit: number) {
    this.limit = limit;
    this.quantity = 0;
    this.number = 0;
    this.state = new EmptyState();
  }

  get getNumber(): number { 
    return this.number++;
  }

  get getState(): StateInterface {
    return this.state;
  }

  set setState(state: StateInterface) {
    this.state = state;
  }

  next(): number | null {
    return this.state.next(this);
  }

  add(quantity: number): void {
    this.state.add(this, quantity);
  }
}

class EmptyState implements StateInterface {

  next(): number | null {
    return null;
  }

  add(ticket: Ticket, quantity: number): void {
    if(quantity < ticket.limit) {
      ticket.quantity = quantity;
      ticket.setState = new WithDataState();
    }else if(quantity === ticket.limit) {
      ticket.quantity = quantity;
      ticket.setState = new FullState();
    }
  }
  
}

class WithDataState implements StateInterface {

  next(ticket: Ticket): number | null {
    ticket.quantity--;
    if( ticket.quantity <= 0 ) {
      ticket.setState = new EmptyState();
    }
    return ticket.getNumber;
  }

  add(ticket: Ticket, quantity: number): void {
    if((ticket.quantity + quantity) < ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new WithDataState();
    }else if((ticket.quantity + quantity) === ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new FullState();
    }
  }
  
}

class FullState implements StateInterface {

  next(ticket: Ticket): number | null {
    ticket.quantity--;
    if( ticket.quantity <= 0 ) {
      ticket.setState = new EmptyState();
    } else {
      ticket.setState = new WithDataState();
    }
    return ticket.getNumber;
  }

  add() {
    console.log("Ticket lleno!!");
  }
  
}

// Ejecución

const ticket = new Ticket(5);
console.log(ticket);

ticket.add(6);

console.log(ticket.next());
console.log(ticket.next());

console.log(ticket);

ticket.add(4);
console.log(ticket);
console.log(ticket.next());
console.log(ticket.next());

console.log(ticket);

console.log(ticket.next());
console.log(ticket.next());

ticket.add(3);
console.log(ticket);

console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());

console.log(ticket);

ticket.add(5);
console.log(ticket);

ticket.add(1);
console.log(ticket);

console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());

console.log(ticket);
