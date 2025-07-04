import { Repository } from "typeorm";
import { Product, Category } from "../entity/Product";

/**
 * This case demonstrates working with many-to-many relationships in TypeORM
 *
 * Scenario:
 *   1. Create categories
 *   2. Create products with categories
 *   3. Find products by category
 *   4. Add categories to an existing product
 *   5. Remove a category from a product
 *
 * @param productRepo
 * @param categoryRepo
 */
export const manyToManyExample = async (
  productRepo: Repository<Product>,
  categoryRepo: Repository<Category>
) => {
  console.log("Starting many-to-many example...");

  // Clear existing data for clean example
  await productRepo.delete({});
  await categoryRepo.delete({});

  // 1. Create some categories
  console.log("Creating categories...");
  const electronics = categoryRepo.create({
    name: "Electronics",
    description: "Electronic devices and gadgets"
  });

  const clothing = categoryRepo.create({
    name: "Clothing",
    description: "Apparel and fashion items"
  });

  const books = categoryRepo.create({
    name: "Books",
    description: "Books and publications"
  });

  await categoryRepo.save([electronics, clothing, books]);
  console.log("Categories created:", [electronics, clothing, books].map(c => c.name).join(", "));

  // 2. Create products with categories
  console.log("\nCreating products with categories...");
  const smartphone = productRepo.create({
    name: "Smartphone",
    description: "Latest model smartphone",
    price: 999.99,
    categories: [electronics]
  });

  const shirt = productRepo.create({
    name: "T-Shirt",
    description: "Cotton t-shirt",
    price: 19.99,
    categories: [clothing]
  });

  const techBook = productRepo.create({
    name: "Programming Guide",
    description: "Learn programming",
    price: 49.99,
    categories: [books, electronics] // A book about electronics belongs to two categories
  });

  await productRepo.save([smartphone, shirt, techBook]);
  console.log("Products created with their categories");

  // 3. Find products by category
  console.log("\nFinding all electronics products...");
  const electronicProducts = await productRepo.find({
    relations: {
      categories: true
    },
    where: {
      categories: {
        id: electronics.id
      }
    }
  });

  console.log(`Found ${electronicProducts.length} electronic products:`);
  for (const product of electronicProducts) {
    console.log(`- ${product.name} ($${product.price}) - Categories: ${product.categories.map(c => c.name).join(", ")}`);
  }

  // 4. Add a category to an existing product
  console.log("\nAdding 'Electronics' category to T-Shirt (incorrect categorization for demo)...");
  const retrievedShirt = await productRepo.findOne({
    where: { id: shirt.id },
    relations: { categories: true }
  });

  if (retrievedShirt) {
    retrievedShirt.categories.push(electronics);
    await productRepo.save(retrievedShirt);
    console.log("T-Shirt categories after update:", retrievedShirt.categories.map(c => c.name).join(", "));
  }

  // 5. Remove a category from a product
  console.log("\nRemoving 'Electronics' category from T-Shirt...");
  const updatedShirt = await productRepo.findOne({
    where: { id: shirt.id },
    relations: { categories: true }
  });

  if (updatedShirt) {
    updatedShirt.categories = updatedShirt.categories.filter(
      category => category.id !== electronics.id
    );
    await productRepo.save(updatedShirt);
    console.log("T-Shirt categories after removal:",
      updatedShirt.categories.length ?
      updatedShirt.categories.map(c => c.name).join(", ") :
      "None");
  }

  // 6. List all products with their categories for final overview
  console.log("\nFinal product list with categories:");
  const allProducts = await productRepo.find({
    relations: { categories: true }
  });

  for (const product of allProducts) {
    console.log(`- ${product.name} ($${product.price}) - Categories: ${product.categories.map(c => c.name).join(", ")}`);
  }

  console.log("\nMany-to-many example completed.");
};
