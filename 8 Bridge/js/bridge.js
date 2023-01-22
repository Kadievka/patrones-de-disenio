class EncoderTextAbstraction {
  constructor(encoder) {
    this.encoder = encoder;
  }

  encode(str) {
    return this.encoder.encode(str);
  }

  decode(str) {
    return this.encoder.decode(str);
  }
}

class Base64EncoderImplementor {

  encode(str) {
    return window.btoa(decodeURI(encodeURIComponent(str)));
  }

  decode(str) {
    return decodeURIComponent(decodeURI(window.atob(str)));
  }
}

class HTMLEncoderImplementor {

  encode(str) {
    return str.split(".").reduce((acc, element)=>(acc + `<p>${element.trim()}</p>`), "");
  }

  decode(str) {
    return str.split("</p>").reduce((acc, element)=>(
      element !== "" ? acc + element.replace("<p>", "") + ". " : acc + ""
    ), "");
  }
}

const encoder1 = new EncoderTextAbstraction(new Base64EncoderImplementor());

console.log(encoder1.encode("pato"));
console.log(encoder1.decode("cGF0bw=="));

const encoder2 = new EncoderTextAbstraction(new HTMLEncoderImplementor());
const enc2 = encoder2.encode("Esto es un texto. Y aqui comienza otro. Y aqui otro")

console.log(enc2);
console.log(encoder2.decode(enc2))
