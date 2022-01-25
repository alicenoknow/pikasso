import { drawCircle, drawLine, drawRect } from "../ui/utils/drawingFunctions";
import InfiniteLoopError from "../ui/utils/InfiniteLoopError";

const MAX_LOOP = 100000;

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
    let _x, _y, _w, _h, _r, _g, _b, _x1, _x2, _y1, _y2, fill, borderWidth, borderColor, loopCounter;
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
        loopCounter = 0;
        while (this.compile(object.test)) {
          loopCounter++;
          if (loopCounter === MAX_LOOP) {
            throw new InfiniteLoopError('');
          }
          this.compile(object.body)
        }
        break;
      case "ForLoop":
        const from = this.compile(object.from);
        const to = this.compile(object.to)
        loopCounter = 0;

        for (let it = from; it < to; it++) {
          loopCounter++;
          if (loopCounter === MAX_LOOP) {
            throw new InfiniteLoopError('');
          }
          this.variableMap.set(object.iterator.name, it);
          this.compile(object.body);
        }
        break;
      case "AssignmentStatement":
        this.variableMap.set(object.key.name, this.compile(object.value));
        break;
      case "Color":
        _r = this.compile(object.r);
        _g = this.compile(object.g);
        _b = this.compile(object.b);
        return this.rgbToHex(_r, _g, _b);
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
        _x = this.compile(object.x);
        _y = this.compile(object.y);
        _r = this.compile(object.r);
        fill = this.fillColor;
        borderColor = this.borderColor;
        borderWidth = this.borderWidth;
        this.parsedInstructions = [...this.parsedInstructions, () => drawCircle(_x, _y, _r, fill, borderColor, borderWidth )]
        break;
      case "LineDefinition":
        _x1 = this.compile(object.x1);
        _y1 = this.compile(object.y1);
        _x2 = this.compile(object.x2);
        _y2 = this.compile(object.y2);
        fill = this.fillColor;
        borderWidth = this.borderWidth;
        this.parsedInstructions = [...this.parsedInstructions, () => drawLine(_x1, _y1, _x2, _y2, fill, borderWidth )]
        break;
      case "RectDefinition":
        _x = this.compile(object.x);
        _y = this.compile(object.y);
        _w = this.compile(object.w);
        _h = this.compile(object.h);
        fill = this.fillColor;
        borderWidth = this.borderWidth;
        borderColor = this.borderColor;
        this.parsedInstructions = [...this.parsedInstructions, () => drawRect(_x, _y, _w, _h, fill, borderWidth, borderColor )];
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
        return this.compile(object.left) * this.compile(object.right);
      case "Division":
        return parseInt(this.compile(object.left) / this.compile(object.right));
      case "Integer":
        return parseInt(object.value);
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