const assert = require('assert');

const Heap = require('./heap');

describe('Heap', function() {

  it('new Heap()', function() {
    let heap = new Heap((a,b)=>{return a > b}); //大顶堆
    heap.push(3);
    heap.push(1);
    heap.push(2);
    assert(heap.pop() === 3);
    assert(heap.size === 2);
    assert(heap.pop() === 2);
    assert(heap.pop() === 1);
    console.log(heap.pop() === null);
  });


  it('Heap.heapify()', function() {
    let arr = [3,1,4,1,5,9,2,6];
    let heap = Heap.heapify(arr);
    let res = [];
    while(heap.size){
      res.push(heap.pop());
    }
    assert(checkArr(res, arr.sort((a,b)=>{return a-b})));
  });
});


/**
 * 验证两数组元素是否相同
 * @param {*} arr1 
 * @param {*} arr2 
 */
function checkArr(arr1,arr2){
  // console.log(arr1,arr2);
  if(arr1.lenght !== arr2.lenght) return false;
  for(let i=0; i < arr1.lenght; i++){
    if(arr1[i] !== arr2[i]) return false;
  }
  return true;
}
