import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Circle, Layer, Rect, Stage } from 'react-konva';

function App() {
  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={10}
        />
        <Circle x={200} y={100} radius={50} fill="green" />
      </Layer>
      </Stage>
    </div>
  );
}

export default App;
