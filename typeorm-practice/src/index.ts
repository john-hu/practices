import { User } from "./entity/User";
import { Order } from "./entity/Order";
import { Product, Category } from "./entity/Product";
import { partialUpdate } from "./cases/partial-update";
import { amendOneToManyRecord } from "./cases/one-to-many";
import { manyToManyExample } from "./cases/many-to-many";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("partial update ==================================================================");
    await partialUpdate(AppDataSource.getRepository<User>(User));
    console.log("amend one to many ===============================================================");
    await amendOneToManyRecord(AppDataSource.getRepository<Order>(Order));
    console.log("many to many ==================================================================");
    await manyToManyExample(
      AppDataSource.getRepository<Product>(Product),
      AppDataSource.getRepository<Category>(Category)
    );
    console.log("=================================================================================");
  })
  .catch((error) => console.log(error));
