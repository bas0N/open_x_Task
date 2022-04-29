import { fetchData } from "./fetch.js";
import { distance } from "./distance.js";
//PART 1 RETRIEVE DATA
console.log("PART 1 RETRIEVE DATA");
const users = await fetchData("https://fakestoreapi.com/users");
const carts = await fetchData("https://fakestoreapi.com/carts");
const products = await fetchData("https://fakestoreapi.com/products");

//PART 2 FIND UNIQUE CATEGORIES
console.log("PART 2 FIND UNIQUE CATEGORIES");
const unique = [...new Set(products.map((item) => item.category))];

//unique object array
const uniqueObjects = [];

unique.forEach(function (productUnique) {
  let sum = 0;
  products.forEach((product) => {
    if (product.category == productUnique) {
      sum = sum + product.price;
    }
  });
  uniqueObjects.push({ name: productUnique, totalPrice: sum.toFixed(2) });
});
console.log(uniqueObjects);

//PART 3 FIND CART WITH HIGHEST VALUE
console.log("PART 3 FIND CART WITH HIGHEST VALUE");
//maxSum variable stores maximal value of products
let maxSum = 0;
//maxSum variable stores an object with maximal value of products
let maxCart = carts[0];

//searching through every cart
carts.forEach((cart) => {
  //temporary sum
  let sumTemp = 0;
  //surfing through every object of given cart
  cart.products.forEach((productInCart) => {
    //finding object of a given index
    let productObject = products.find((obj) => {
      return obj.id == productInCart.productId;
    });
    //adding prices of products in the cart
    sumTemp = sumTemp + productInCart.quantity * productObject.price;
  });
  //comparison of sum values to reasign
  if (sumTemp > maxSum) {
    //simultaneously changing the value of maxSum and maxCart
    maxSum = sumTemp;
    maxCart = cart;
  }
});
console.log(`The max cart value is ${maxSum} for the cart :`);
console.log(maxCart);
let owner = users.find((obj) => {
  return obj.id == maxCart.userId;
});
console.log(`and the owner of: ${owner.name.firstname} ${owner.name.lastname}`);

//PART 4 FIND TWO USERS WITH THE GREATES DISTANCE BETWEEN THEM
console.log("PART 4 FIND TWO USERS WITH THE GREATES DISTANCE BETWEEN THEM");
//function to calculate distance is imported from distance.js

//initial max distance
let maxDistance = distance(
  users[0].address.geolocation,
  users[1].address.geolocation
);
//initial first user
let user0 = users[0];
//initial second user
let user1 = users[1];

users.forEach((userStart) => {
  //temporary variable for distance comparison
  let tempDistance;
  users.forEach((userEnd) => {
    //calculating the distance between objects
    tempDistance = distance(
      userStart.address.geolocation,
      userEnd.address.geolocation
    );
    //comparing the distances and reasigning the values
    if (tempDistance > maxDistance) {
      maxDistance = tempDistance;
      user0 = userStart;
      user1 = userEnd;
    }
  });
});

console.log(
  `The max distance is: ${maxDistance} and it occurs between user with email ${user0.email} and ${user1.email}`
);
