import React from "react";
import { Layer, Stage } from "react-konva";

interface Props {
  shapes: (() => JSX.Element)[];
}

export default class CanvaOutput extends React.Component<Props> {
  render() {
    return (
      <Stage
        width={window.innerWidth * 0.5 - 20}
        height={window.innerHeight * 0.8}
        style={{ margin: 10, backgroundColor: "#def4ff" }}
      >
        <Layer>{this.props.shapes.map((fn) => fn())}</Layer>
      </Stage>
    );
  }
}
