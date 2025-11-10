import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import connectDB from '../config/db.js';
import Product, { ProductCategory } from '../models/Product.js';

dotenv.config();

const categories: ProductCategory[] = [
  'Electronics',
  'Clothing',
  'Books',
  'Home',
  'Sports',
  'Toys',
];

const generateProduct = () => {
  const category = faker.helpers.arrayElement(categories);

  let name: string;
  let description: string;
  let brand: string | undefined;

  switch (category) {
    case 'Electronics':
      name =
        faker.commerce.productName() +
        ' ' +
        faker.helpers.arrayElement(['Pro', 'Max', 'Ultra', 'Plus', 'Premium']);
      description = faker.commerce.productDescription();
      brand = faker.helpers.arrayElement([
        'TechBrand',
        'AudioTech',
        'SmartTech',
        'ElectroMax',
      ]);
      break;
    case 'Clothing':
      name =
        faker.commerce.productName() +
        ' ' +
        faker.helpers.arrayElement(['Classic', 'Premium', 'Designer', 'Sport']);
      description = `Comfortable and stylish ${faker.commerce.productAdjective()} ${category.toLowerCase()} item.`;
      brand = faker.helpers.arrayElement([
        'FashionCo',
        'StyleBrand',
        'WearMax',
        'ClothTech',
      ]);
      break;
    case 'Books':
      name =
        faker.lorem.words(3) +
        ' - ' +
        faker.helpers.arrayElement(['Novel', 'Guide', 'Collection', 'Edition']);
      description = faker.lorem.paragraph();
      brand = faker.helpers.arrayElement([
        'BookHouse',
        'ReadMore',
        'LiteraryPress',
        'PageTurner',
      ]);
      break;
    case 'Home':
      name =
        faker.commerce.productName() +
        ' ' +
        faker.helpers.arrayElement(['Set', 'Collection', 'Bundle', 'Suite']);
      description = `Beautiful ${faker.commerce.productAdjective()} ${category.toLowerCase()} item for your space.`;
      brand = faker.helpers.arrayElement([
        'HomeStyle',
        'InteriorDesign',
        'HomeMax',
        'LivingSpace',
      ]);
      break;
    case 'Sports':
      name =
        faker.commerce.productName() +
        ' ' +
        faker.helpers.arrayElement(['Pro', 'Elite', 'Performance', 'Active']);
      description = `High-performance ${category.toLowerCase()} equipment for athletes.`;
      brand = faker.helpers.arrayElement([
        'SportBrand',
        'FitMax',
        'ActiveWear',
        'ProSport',
      ]);
      break;
    case 'Toys':
      name =
        faker.commerce.productName() +
        ' ' +
        faker.helpers.arrayElement(['Set', 'Collection', 'Pack', 'Bundle']);
      description = `Fun and engaging ${category.toLowerCase()} for all ages.`;
      brand = faker.helpers.arrayElement([
        'ToyCo',
        'PlayTime',
        'FunBrand',
        'KidsZone',
      ]);
      break;
    default:
      name = faker.commerce.productName();
      description = faker.commerce.productDescription();
      brand = faker.company.name();
  }

  return {
    name,
    description,
    price: parseFloat(faker.commerce.price({ min: 10, max: 1500, dec: 2 })),
    image: faker.image.urlLoremFlickr({
      width: 500,
      height: 500,
      category: category.toLowerCase(),
    }),
    category,
    brand,
    inStock: faker.datatype.boolean({ probability: 0.9 }),
    stockCount: faker.number.int({ min: 0, max: 200 }),
    rating: parseFloat(
      faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)
    ),
    numReviews: faker.number.int({ min: 10, max: 500 }),
  };
};

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Generate 30 products
    const products = Array.from({ length: 30 }, generateProduct);

    // Insert new products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error seeding products:', errorMessage);
    process.exit(1);
  }
};

seedProducts();
