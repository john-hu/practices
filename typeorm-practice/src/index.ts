import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { partialUpdate } from "./cases/partial-update";

AppDataSource.initialize()
  .then(async () => {
    const userRepo: Repository<User> = AppDataSource.getRepository<User>(User);
    await partialUpdate(userRepo);
  })
  .catch((error) => console.log(error));
