### 使用

- Heap 构造函数
```js
const Heap = require('./heap');

let heap = new Heap((a,b)=>{return a > b}); //大顶堆

heap.push(1);
heap.push(3);
heap.push(2);

heap.pop(); // 3
```

- Heap.heapify 静态方法
```js
const Heap = require('./heap');

let arr = [3,1,4,1,5,9,2,6];
let heap = Heap.heapify(arr);
let res = [];
while(heap.size){
    res.push(heap.pop());
}

//res: [1, 1, 2, 3, 4, 5, 6, 9]
```



### 测试
- npm i
- npm test