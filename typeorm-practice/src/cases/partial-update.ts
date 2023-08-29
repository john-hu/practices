import { Repository } from "typeorm";
import { User } from "../entity/User";

export const partialUpdate = async (userRepo: Repository<User>) => {
  console.log("Test the partial update result...");
  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  console.log(`Origianl data: ${JSON.stringify(user)}`);
  await userRepo.save(user);
  console.log(`Saved a new user with id: ${user.id}`);
  const findCondition = { where: { id: user.id } };
  const testUser1 = await userRepo.findOne(findCondition);
  const testUser2 = await userRepo.findOne(findCondition);
  console.log(`Test user 1 id: ${testUser1.id} for updating firstName`);
  console.log(`Test user 2 id: ${testUser2.id} for updating age`);
  testUser1.firstName = "John";
  testUser2.age = 18;
  console.log("Update separately and save...", [testUser1, testUser2]);
  await userRepo.save([testUser1, testUser2]);
  console.log("After save...", [testUser1, testUser2]);

  const users = await userRepo.find(findCondition);
  console.log("Dump from DB: ", users);
};
