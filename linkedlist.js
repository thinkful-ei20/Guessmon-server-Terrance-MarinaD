
class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAt(item, position) {
    let currNode = this.head;
    let counter = 0;
    while (currNode.next !== null) {
      if (counter === position - 1) {
        currNode.next = new _Node(item, currNode.next);
        return;
      } else {
        counter++;
        currNode = currNode.next;
      }
    }
    currNode.next = new _Node(item, null);
    return;
  }

  removeFirst() {
    this.head = this.head.next;
  }
}

module.exports = {_Node, LinkedList};