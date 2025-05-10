import { HashMap } from "./hashmap.js";

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black"); // not working -- should be in [11]
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden"); // not working -- should be in [12]
test.set("apple", "green-red");

console.log(test.buckets);
// console.log(test.buckets[1][0].key); // for k of buckets if k === key, change value
