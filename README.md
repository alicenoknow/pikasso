## pikasso language

Simple language to generate shapes.

Example:
```
border 0 0 0 1.
w = 80.
h = 80.
g = 255.

for i in 1 5 {
  r = 255 - i*30.
  g = g/2.
  b = 230 + i*5.
  fill r g b.
  
  a = h + 10.
  y = i*a.
  for j in 1 i+1 {
    a = w + 10.
    x = 100 + j * a.
    draw rect x y w h.
  }
}
```

![image](https://user-images.githubusercontent.com/56412617/150968726-ea648da5-0283-4668-a916-53d5b92c297b.png)
