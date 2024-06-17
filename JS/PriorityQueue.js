parentIndex = function(index) {return Math.floor((index - 1) / 2);}
leftChildIndex = function(index) {return 2 * index + 1;}
rightChildIndex = function(index) {return 2 * index + 2;}
swap = function(heap, index1, index2) 
{[heap[index1], heap[index2]] = [heap[index2], heap[index1]];}
enqueue = function(heap, node)
{
    heap.push(node);
    this.heapifyUp(heap);
}
function heapifyUp(heap)
{
    let index = heap.length - 1;
    while(index > 0 && heap[this.parentIndex(index)].fcost > heap[index].fcost)
    {
        this.swap(heap, this.parentIndex(index), index);
        index = this.parentIndex(index);
    }
}
function dequeue(heap)
{
    if(heap.length == 0) {return null;}
    if (heap.length == 1) return heap.pop();
    let root = heap[0];
    heap[0] = heap.pop();
    this.heapifyDown(heap);
    return root;
}
function heapifyDown(heap)
{
    let index = 0;
    while (this.leftChildIndex(index) < heap.length) 
    {
        let minIndex = this.leftChildIndex(index);
        if (this.rightChildIndex(index) < heap.length && heap[this.rightChildIndex(index)].fcost < heap[minIndex].fcost) 
        {minIndex = this.rightChildIndex(index);}
        if (heap[index].fcost <= heap[minIndex].fcost) break;
        this.swap(heap, index, minIndex);
        index = minIndex;
    }
}