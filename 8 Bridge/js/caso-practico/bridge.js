class HtmlPainter {
  
  constructor(container) {
    this.container = container;
    this.width = "1px";
    this.height = "1px";
    this.color = "#000000";
  }

  setWidth(width) {
    this.width = width + "px";
  }

  setHeight(height) {
    this.height = height + "px";
  }

  setColor(color) {
    this.color = color;
  }

  print() {
    this.container.innerHTML = `
    <div style="width:${this.width};height:${this.height};background:${this.color};">
    </div>`;
    
  }
}

class Editor {

  constructor(implementor) {
    this.implementor = implementor;
  }

  executePrint(width, height, color) {
    this.implementor.setWidth(width);
    this.implementor.setHeight(height);
    this.implementor.setColor(color);
    this.implementor.print();
  }
}

class CanvasPainter {
  
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    
    this.width = 1;
    this.height = 1;
    this.color = "#000000";

  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  setColor(color) {
    this.color = color;
  }

  print() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

class EditorWithClear extends Editor {
  
  constructor(implementor) {
    super(implementor);
    
  }

  clear() {
    this.implementor.setWidth(0);
    this.implementor.setHeight(0);
    this.implementor.print();
  }
}

const editorHtmlPainter = new EditorWithClear(new HtmlPainter(content));
console.log(editorHtmlPainter);
const editorCanvasPainter = new EditorWithClear(new CanvasPainter(canvas));
console.log(editorCanvasPainter);

range1.addEventListener("input", (event) => {
  const width = event.target.value;
  const height = event.target.value;
  const color = editorColor1.value;
  
  editorHtmlPainter.executePrint(width, height, color);
});

editorColor1.addEventListener("input", (event) => {
  const color = event.target.value;
  const width = range.value;
  const height = range.value;
  
  editorHtmlPainter.executePrint(width, height, color);
});

btn1.addEventListener("click", () => {
  editorHtmlPainter.clear();
});

range2.addEventListener("input", (event) => {
  const width = event.target.value;
  const height = event.target.value;
  const color = editorColor2.value;
  
  editorCanvasPainter.executePrint(width, height, color);
});

editorColor2.addEventListener("input", (event) => {
  const color = event.target.value;
  const width = range.value;
  const height = range.value;
  
  editorCanvasPainter.executePrint(width, height, color);
});

btn2.addEventListener("click", () => {
  editorCanvasPainter.clear();
});

