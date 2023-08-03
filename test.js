function trimSpaces(obj) {
  if (typeof obj !== "object" || obj === null) {
    // Base case: If the object is not an object or is null, return it as is.
    if (typeof obj === "string") {
      // If the value is a string, trim the spaces and return it.
      return obj.trim();
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    // If the object is an array, process each element recursively.
    for (let i = 0; i < obj.length; i++) {
      obj[i] = trimSpaces(obj[i]);
    }
    return obj;
  }

  // Process the object's properties recursively and trim spaces from the values.
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      obj[key] = trimSpaces(value);
    }
  }

  return obj;
}

// Example usage:
const inputObj = {
  name: " John Doe  ",
  age: 25,
  address: {
    street: " 123 Main Street ",
    city: " New York ",
  },
  hobbies: ["  Reading ", "  Writing", "   Coding   "],
};

trimSpaces(inputObj);
console.log(inputObj);
