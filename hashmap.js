// hashmap.js

export class HashMap {
  constructor(load = 0.75, capacity = 16) {
    this.load = load;
    this.capacity = capacity;
    this.buckets = Array(this.capacity)
      .fill()
      .map(() => []);
  }

  //methods

  // method to hash the key
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  // return an individual bucket based on the key
  getBucket(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[index];
    return bucket;
  }

  // push key and value object into the correct bucket
  set(key, value) {
    const bucket = this.getBucket(key);
    for (const element of bucket) {
      // if key exists, replace with new value
      if (element.key === key) {
        element.value = value;
      } else {
        bucket.push({ key, value }); // otherwise add to array
        if (this.length() > this.capacity * this.load) {
          this.expandHashMap();
        }
      }
      return;
    }
    bucket.push({ key, value });

    // if load is exceeded, create a new hashmap with double the capacity
    if (this.length() > this.capacity * this.load) {
      this.expandHashMap();
    }
  }

  // Remember to grow your buckets to double their capacity when your hash map reaches the load factor. The methods mentioned later in this assignment can help you handle the growth logic, so you may want to implement this feature near the end. However, we mention this with set() because it’s important to grow buckets exactly as they are being expanded.

  // returns the value of the key
  get(key) {
    const bucket = this.getBucket(key);
    for (const element of bucket) {
      // if key exists, return value
      if (element.key === key) {
        return element.value;
      }
    }
    return null;
  }

  // returns true if hashmap contains the key
  has(key) {
    const bucket = this.getBucket(key);
    for (const element of bucket) {
      // if key exists, return true
      if (element.key === key) {
        return true;
      }
    }
    return false;
  }

  // removes array entry corresponding to key
  remove(key) {
    if (this.has(key)) {
      const bucket = this.getBucket(key);
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket.splice(i, 1);
        }
      }
    } else {
      return false;
    }
  }

  // returns the number of stored keys in the hash map.
  length() {
    let count = 0;
    for (const element of this.buckets) {
      if (element) {
        for (const e of element) {
          count += 1;
        }
      }
    }
    return count;
  }

  // clears array and resets it to the default capacity of 16
  clear(cap = 16) {
    this.buckets = Array(cap)
      .fill()
      .map(() => []);
  }

  // returns an array containing all the keys inside the hash map.
  keys() {
    let keysArr = [];
    for (const element of this.buckets) {
      if (element) {
        for (const e of element) {
          keysArr.push(e.key);
        }
      }
    }
    return keysArr;
  }

  // returns an array containing all the values.
  values() {
    let valuesArr = [];
    for (const element of this.buckets) {
      if (element) {
        for (const e of element) {
          valuesArr.push(e.value);
        }
      }
    }
    return valuesArr;
  }

  // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    let entriesArr = [];
    for (const element of this.buckets) {
      if (element) {
        for (const e of element) {
          const arr = [e.key, e.value];
          entriesArr.push(arr);
        }
      }
    }
    return entriesArr;
  }

  // double the size of the hashmap if we exceed the load and
  // re-set all keys and values into new hashmap
  expandHashMap() {
    this.capacity = this.capacity * 2;
    const entriesArr = this.entries();
    this.clear(this.capacity);
    for (let i = 0; i < entriesArr.length; i++) {
      this.set(entriesArr[i][0], entriesArr[i][1]);
    }
  }
}
