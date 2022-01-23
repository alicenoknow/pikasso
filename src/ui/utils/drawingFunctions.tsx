import { Circle, Line, Rect } from "react-konva";

export function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  fill: string,
  width: number
) {
  return (
    <Line
      key={x1 + y1 + x2 + y2}
      stroke={fill}
      points={[x1, y1, x2, y2]}
      strokeWidth={width}
    />
  );
}

export function drawRect(
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  borderWidth: number,
  borderColor: string
) {
  return (
    <Rect
      key={x + y + width + height}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={borderColor}
      strokeWidth={borderWidth}
      shadowBlur={5}
    />
  );
}

export function drawCircle(
  x: number,
  y: number,
  r: number,
  fill: string,
  borderColor: string,
  borderWidth: number
) {
  console.warn("Color ", fill);
  return (
    <Circle
      key={x + y + r}
      x={x}
      y={y}
      radius={r}
      fill={fill}
      stroke={borderColor}
      strokeWidth={borderWidth}
      shadowBlur={5}
    />
  );
}
