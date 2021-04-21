const faker = require('faker')
faker.seed(1024);

const database = [...Array(30)].map((id) => ({
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  category: faker.random.arrayElement([
    "Pregnancy",
    "Childcare",
    "Wearables",
  ]),
  brand: faker.random.arrayElement(["A", "B", "C", "D"]),
  isPopular: faker.datatype.boolean(),
  isNewest: faker.datatype.boolean(),
  inStock: faker.datatype.boolean(),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1.41, 2.52, 3.61, 4.89, 5.0]),
  offer: faker.random.arrayElement(["10", "20", "50", "70"]),
  totalPurchase: faker.datatype.number(),
  availableQty: faker.random.arrayElement([5, 25, 3, 17, 44, 100]),
}));

module.exports = database;