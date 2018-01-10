var faker = require('faker');


var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

for (var i = 0; i < 10; i++) {
  var randomCard = faker.commerce.product() + ' ' + faker.commerce.price(); // random contact card containing many properties
  console.log(randomCard);
}


//console.log(randomEmail);
//console.log(randomName);