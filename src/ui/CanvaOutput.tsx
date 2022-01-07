import React from "react";
import { Circle, Layer, Rect, Stage } from 'react-konva';

interface Props {
    shapes: string;
}

export default class CodeInput extends React.Component<Props> {
    render () {
        return (
            <Stage width={window.innerWidth * 0.5 - 20} height={window.innerHeight * 0.8} style={{margin: 10, backgroundColor: '#def4ff'}}>
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
        );
    }
}