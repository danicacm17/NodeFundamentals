/** Node: node for a stack. */
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  add to the top and remove from the top. */
class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to the top of the stack. Returns undefined. */
  push(val) {
    let newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }

    this.size++;
    return undefined; // Required by test
  }

  /** pop(): remove the node from the top of the stack and return its value. */
  pop() {
    if (!this.first) throw new Error("Stack is empty");

    let removedNode = this.first;
    this.first = this.first.next;

    if (!this.first) this.last = null; // If stack becomes empty, update last pointer

    this.size--;
    return removedNode.val;
  }

  /** peek(): return the value of the first node in the stack. */
  peek() {
    if (!this.first) throw new Error("Stack is empty");
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */
  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;
