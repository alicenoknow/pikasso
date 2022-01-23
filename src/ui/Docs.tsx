import React from "react";
import ReactMarkdown from "react-markdown";

export default class Docs extends React.Component {
  render() {
    return (
      <div className="docs">
        <div className="h1">documentation of pikasso language 🎨</div>
        <br />
        <code>.</code> - end of expression <br />
        <br />
        e.g. <code>x = 5.</code>
        <br />
        <br />
        <h3>operators</h3>
        <code>+</code> - addition
        <br />
        <code>-</code> - subtraction
        <br />
        <code>*</code> - multiplication
        <br />
        <code>/</code> - division
        <br />
        <code>=</code> - assignment
        <br />
        <code>!=</code> - not equal
        <br />
        <code>==</code> - equal
        <br />
        <code>{"<"}=</code> - less or equal
        <br />
        <code>{">"}=</code> - greater or equal
        <br />
        <code>{"<"}</code> - less
        <br />
        <code>{">"}</code> - greater
        <br />
        <code>||</code> - or
        <br />
        <code>{"&&"}</code> - and
        <br />
        <code>!</code> - negation
        <br />
        <br />
        <h3>special values</h3>
        <code>true</code>
        <br />
        <code>false</code>
        <br />
        <br />
        <h3>loops</h3>
        <code>for #elem in #start #end {"{  }"}</code>
        <br />
        <code>while #condition {"{  }"}</code>
        <br />
        <br />
        <h3>drawing</h3>
        <code>fill #r #g #b</code>
        <br />
        <code>border #r #g #b #width</code>
        <br />
        <code>circle #x #y #r</code>
        <br />
        <code>rect #x #y #w #h</code>
        <br />
        <code>line #x1 #y1 #x2 #y2</code>
        <br />
      </div>
    );
  }
}
