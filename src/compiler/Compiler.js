import { drawCircle, drawLine, drawRect } from "../ui/utils/drawingFunctions";

export class Compiler {
  variableMap = new Map();
  fillColor = '#000000';
  borderColor = '#000000';
  borderWidth = 1;
  parsedInstructions = [];

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  compile(object) {
    let _x, _y, _w, _h, _r, _x1, _x2, _y1, _y2;
    switch(object.type) {
      case "Program":
        this.compile(object.value);
        return this.parsedInstructions;
      case "Instructions":
        const instructions = object.value;
        for (let i = 0; i < instructions.length; i++) { 
          this.compile(instructions[i]); 
        }
        break;
      case "WhileLoop":
        while (this.compile(object.test)) {
          this.compile(object.body)
        }
        break;
      case "ForLoop":
        const from = this.compile(object.from);
        const to = this.compile(object.to)
        for (let it = from; it < to; it++) {
          this.variableMap.set(object.iterator.name, it);
          this.compile(object.body);
        }
        break;
      case "AssignmentStatement":
        this.variableMap.set(object.key.name, this.compile(object.value));
        console.warn("Assigning ", object.key.name, this.compile(object.value))
        break;
      case "Color":
        return this.rgbToHex(this.compile(object.r), this.compile(object.g), this.compile(object.b));
      case "BorderStatement":
        this.compile(object.value)
        break;
      case "BorderDefinition":
        this.borderColor = this.compile(object.color);
        this.borderWidth = this.compile(object.width);
        break;
      case "FillStatement":
        this.fillColor = this.compile(object.color);
        break;
      case "DrawStatement":
        this.compile(object.object);
        break;
      case "CircleDefinition":
        console.warn(_x, _y)
        _x = this.compile(object.x);
        _y = this.compile(object.y);
        _r = this.compile(object.r);
        console.warn(_x, _y)

        this.parsedInstructions = [...this.parsedInstructions, () => drawCircle(_x, _y, _r, this.fillColor, this.borderColor, this.borderWidth )]
        break;
      case "LineDefinition":
        _x1 = this.compile(object.x1);
        _y1 = this.compile(object.y1);
        _x2 = this.compile(object.x2);
        _y2 = this.compile(object.y2);
        this.parsedInstructions = [...this.parsedInstructions, () => drawLine(_x1, _y1, _x2, _y2, this.fillColor, this.borderWidth )]
        break;
      case "RectDefinition":
        _x = this.compile(object.x);
        _y = this.compile(object.y);
        _w = this.compile(object.w);
        _h = this.compile(object.h);
        this.parsedInstructions = [...this.parsedInstructions, () => drawRect(_x, _y, _w, _h, this.fillColor, this.borderWidth, this.borderColor )];
        break;
      case "Circle":
        this.compile(object.value);
        break;
      case "Line":
        this.compile(object.value);
        break;
      case "Rect":
        this.compile(object.value);
        break;
      case "Boolean":
        return object.value;
      case "Identifier":
        return this.variableMap.get(object.name);
      case "Addition":
        return this.compile(object.left) + this.compile(object.right);
      case "Subtraction":
        return this.compile(object.left) - this.compile(object.right);
      case "Multiplication":
        console.warn(this.variableMap, " Multi ",object )
        return this.compile(object.left) * this.compile(object.right);
      case "Division":
        return this.compile(object.left) / this.compile(object.right);
      case "Integer":
        return object.value;
      case "Or":
        return this.compile(object.left) || this.compile(object.right);
      case "And":
        return this.compile(object.left) && this.compile(object.right);
      case "Not":
        return !this.compile(object.value);
      case "Greater":
        return this.compile(object.left) > this.compile(object.right);
      case "Less":
        return this.compile(object.left) < this.compile(object.right);
      case "GreaterEqual":
        return this.compile(object.left) >= this.compile(object.right);
      case "LessEqual":
        return this.compile(object.object.left) <= this.compile(object.right);
      case "Equal":
        return this.compile(object.left) === this.compile(object.right);
      case "NotEqual":
        return this.compile(object.left) !== this.compile(object.right);
    }
  }
}  