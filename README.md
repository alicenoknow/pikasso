## pikasso language

Simple language to generate shapes.

Example:
```
border 0 0 0 2.
a = 230.
b = 80.
c = 200.

for i in 1 5 {
  fill a b c.
  a = a - 10.
  b = b + 20.
  c = c/2.
  draw circle i*100 600 80.
  fill c a b.
  draw rect i*50 i*50 50 50.
}
```

![image](https://user-images.githubusercontent.com/56412617/150702701-b22cb101-d2d5-4754-8f25-d15009544cac.png)
