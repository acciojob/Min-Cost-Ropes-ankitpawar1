// script.js
function mincost(arr) {
    // Create a min-heap using a priority queue
    const heap = new MinHeap(arr);
    
    let totalCost = 0;
    
    // While there are more than one ropes in the heap
    while (heap.size() > 1) {
        // Extract the two smallest ropes
        const first = heap.extractMin();
        const second = heap.extractMin();
        
        // Combine the ropes
        const combined = first + second;
        
        // Add the cost to total cost
        totalCost += combined;
        
        // Insert the combined rope back to the heap
        heap.insert(combined);
    }
    
    return totalCost;
}

// Helper class for MinHeap
class MinHeap {
    constructor(arr = []) {
        this.heap = [];
        arr.forEach(element => this.insert(element));
    }
    
    size() {
        return this.heap.length;
    }
    
    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }
    
    extractMin() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        
        return min;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] < this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }
    
    bubbleDown(index) {
        const lastIndex = this.heap.length - 1;
        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallestIndex = index;
            
            if (leftIndex <= lastIndex && this.heap[leftIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftIndex;
            }
            if (rightIndex <= lastIndex && this.heap[rightIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightIndex;
            }
            if (smallestIndex !== index) {
                [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
                index = smallestIndex;
            } else {
                break;
            }
        }
    }
}

function calculateMinCost() {
    const input = document.getElementById('ropesInput').value;
    const ropes = input.split(',').map(Number);
    const result = mincost(ropes);
    document.getElementById('result').textContent = `Minimum cost to connect all ropes: ${result}`;
}
