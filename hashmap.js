// hashmap.js

export class HashMap {
  constructor(load = 0.75, capacity = 16) {
    this.load = load;
    this.capacity = capacity;
    this.buckets = Array(this.capacity)
      .fill()
      .map((e) => []);
  }

  //methods
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    for (let element of bucket) {
      if (element.key === key) {
        element.value = value;
      } else {
        bucket.push({ key, value });
      }
      return;
    }
    bucket.push({ key, value });
  }
  // takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten, and we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. Following this logic, Carlos should contain only the latter value).

  // Recall that collisions occur when TWO DIFFERENT keys generate the same hash code and get assigned to the same bucket. (e.g. Rama and Sita are both hashed to 3, so 3 becomes a location for Rama AND Sita. However, we know that this is not an update because the keys are different). Review the dealing with collisions section of the previous lesson to find a way to handle our collisions.

  // Remember to grow your buckets to double their capacity when your hash map reaches the load factor. The methods mentioned later in this assignment can help you handle the growth logic, so you may want to implement this feature near the end. However, we mention this with set() because it’s important to grow buckets exactly as they are being expanded.

  get(key) {}
  // takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.

  has(key) {}
  // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

  remove(key) {}
  // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

  length() {}
  // returns the number of stored keys in the hash map.

  clear() {}
  // removes all entries in the hash map.

  keys() {}
  // returns an array containing all the keys inside the hash map.

  values() {}
  // returns an array containing all the values.

  entries() {}
  // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
}

// use whenever we try to access a bucket as a failsafe
// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

// Remember we don’t want collisions. In a perfect world, each bucket will either have 0 or 1 node only, so we grow our buckets array to have more chance that our nodes will spread and not stack up in the same buckets. To grow our array, we create a new one that is double its size and then copy all existing nodes over to the buckets of this new array, hashing their keys again.

// When do we know that it’s time to grow our buckets array?
// To deal with this, our hash map class needs to keep track of two new fields, the capacity and the load factor.

// The capacity is the total number of buckets we currently have.

// The load factor is a number that we assign our hash map to at the start. It’s the factor that will determine when it is a good time to grow our buckets array. Hash map implementations across various languages use a load factor between 0.75 and 1.
