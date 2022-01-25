Program = instructions:Instructions { return { type: "Program", value: instructions }; }

Instructions = instructions:(Instruction)* { return { 
	type: "Instructions", 
    value: instructions,
 }; }
    
Instruction 
= ForLoop
/ WhileLoop
/ BorderStatement
/ FillStatement
/ DrawStatement
/ AssignmentStatement

__  = Whitespace*
Whitespace = [ \t\r\n]
EOL = "." __

ForKeyword = "for"
InKeyword = "in"
WhileKeyword = "while"

TrueKeyword = "true"
FalseKeyword = "false"

BorderKeyword = "border"
DrawKeyword = "draw"
FillKeyword = "fill"

LineObjectKeyword = "line"
CircleObjectKeyword = "circle"
RectObjectKeyword = "rect"

WhileLoop = WhileKeyword __ test:ConditionalStatement __ "{" __ body:Instructions __ "}"__ { 
  return { 
  	type: "WhileLoop", 
    test, 
    body,
  }; }
  
ForLoop = ForKeyword __ iterator:Identifier __ InKeyword __ from:ArithmeticStatement __ to:ArithmeticStatement __ "{" __ body:Instructions __ "}" __ {
      return {
        type: "ForLoop",
        iterator,
        from,
        to,
        body,
      };
    }
    
AssignmentStatement = key:Identifier __ "=" __ value:ArithmeticStatement __ EOL { 
  return {
        type: "AssignmentStatement",
        key,
        value,
  	   };}

ColorStatement = r:ArithmeticStatement __ g:ArithmeticStatement __ b:ArithmeticStatement { return {
        type: "Color",
        r,
        g,
        b,
      };}

BorderStatement = BorderKeyword __ value:BorderDefinition __ EOL { return {
        type: "BorderStatement",
        value,
      };}

BorderDefinition = color:ColorStatement __ width:ArithmeticStatement { return {
        type: "BorderDefinition",
        color,
        width,
      };}

FillStatement = FillKeyword __ color:ColorStatement __ EOL { return {
        type: "FillStatement",
        color,
      };}

DrawStatement = DrawKeyword __ object:ObjectDefinition __ EOL { return {
        type: "DrawStatement",
        object,
      };}

CircleDefinition = CircleObjectKeyword __ x:ArithmeticStatement __ y:ArithmeticStatement __ r:ArithmeticStatement { return {
        type: "CircleDefinition",
        x,
        y,
        r,
      };}
LineDefinition = LineObjectKeyword __ x1:ArithmeticStatement __ y1:ArithmeticStatement __ x2:ArithmeticStatement __ y2:ArithmeticStatement { return {
        type: "LineDefinition",
        x1,
        y1,
        x2,
        y2,
      };}
RectDefinition = RectObjectKeyword __ x:ArithmeticStatement __ y:ArithmeticStatement __ w:ArithmeticStatement __ h:ArithmeticStatement { return {
        type: "RectDefinition",
        x,
        y,
        w,
        h,
      };}

ObjectDefinition
= value:CircleDefinition { return { type: "Circle", value, }; }
/ value:LineDefinition { return { type: "Line", value, }; }
/ value:RectDefinition { return { type: "Rect", value, }; }

BooleanLiteral
  = TrueKeyword  { return { type: "Boolean", value: true }; }
  / FalseKeyword { return { type: "Boolean", value: false }; }

Keyword = DrawKeyword 
/ FillKeyword 
/ CircleObjectKeyword 
/ RectObjectKeyword 
/ LineObjectKeyword
/ BorderKeyword
/ ForKeyword
/ InKeyword
/ WhileKeyword
/ TrueKeyword
/ FalseKeyword

ReservedWord = Keyword / BooleanLiteral

Identifier = !ReservedWord name:[a-zA-Z]+ { return { type: "Identifier", name: name.join('') }; }

ArithmeticStatement = AddStatement

AddStatement
  = left:MulStatement __ "+" __ right:AddStatement { return { type: "Addition", left, right } }
  / left:MulStatement __ "-" __ right:AddStatement { return { type: "Subtraction", left, right } }
  / MulStatement

MulStatement
  = left:BaseStatement __ "*" __ right:MulStatement { return  { type: "Multiplication", left, right }; }
  / left:BaseStatement __ "/" __ right:MulStatement { return  { type: "Division", left, right }; }
  / BaseStatement

BaseStatement
  = Integer
  / Identifier

Integer = digits:[0-9]+ { return { type: "Integer", value: parseInt(digits.join(""), 10) }; }
/ '-' digits:[0-9]+ { return { type: "Integer", value: -parseInt(digits.join(""), 10) }; }

ConditionalStatement = AndStatement 

OrStatement
= left:LogicalExpression __ "||" __ right:OrStatement { return { type: "Or", left, right }; }
/ LogicalExpression

AndStatement
= left:OrStatement __ "&&" __ right:AndStatement { return { type: "And", left, right }; }
/ OrStatement

LogicalExpression
= "!" value:LogicalExpression { return { type: "Not", value }; }
/ RelationStatement
/ BooleanLiteral

RelationStatement
= left:ArithmeticStatement __ ">" __ right:ArithmeticStatement { return { type: "Greater", left, right }; }
/ left:ArithmeticStatement __ "<" __ right:ArithmeticStatement { return { type: "Less", left, right }; }
/ left:ArithmeticStatement __ ">=" __ right:ArithmeticStatement { return { type: "GreaterEqual", left, right }; }
/ left:ArithmeticStatement __ "<=" __ right:ArithmeticStatement { return { type: "LessEqual", left, right }; }
/ left:ArithmeticStatement __ "==" __ right:ArithmeticStatement { return { type: "Equal", left, right }; }
/ left:ArithmeticStatement __ "!=" __ right:ArithmeticStatement { return { type: "NotEqual", left, right }; }