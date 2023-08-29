import { FindOneOptions, Repository } from "typeorm";
import { Order, OrderDetail } from "../entity/Order";

/**
 * This case is to demostrate the parent entity update triggers the
 * create/remove/update on the child entities.
 *
 * Scenario:
 *     Preset: An order with 3 items
 *     Actions:
 *         1. keep the first item
 *         2. update the second item
 *         3. delete the third item
 *         4. insert a new item
 *
 * @param orderRepo
 */
export const amendOneToManyRecord = async (orderRepo: Repository<Order>) => {
  console.log("Test the One to Many result...");
  console.log("Prepare data...");
  // prepare preset
  const order = new Order();
  order.orderName = "Stationery order";
  order.buyer = "John";
  order.details = [
    orderRepo.manager.create<OrderDetail>(OrderDetail, {
      product: "pencil",
      quantity: 10,
      price: 0.25,
    }),
    orderRepo.manager.create<OrderDetail>(OrderDetail, {
      product: "eraser",
      quantity: 20,
      price: 0.1,
    }),
    orderRepo.manager.create<OrderDetail>(OrderDetail, {
      product: "ball pen",
      quantity: 15,
      price: 0.5,
    }),
  ];
  await orderRepo.save(order);
  console.log(`Saved a new order with id: ${order.id}`);
  const findCondition: FindOneOptions<Order> = { where: { id: order.id } };
  // load the data from database
  const existing = await orderRepo.findOne(findCondition);
  // update the 2nd item
  const eraser = existing.details[1];
  eraser.quantity = 99;
  console.log("Update the details to pencil(10), eraser(99), water pen(5)");
  existing.details = [
    existing.details[0], // keep the first one
    eraser, // put back the 2nd one
    // add a new one
    orderRepo.manager.create<OrderDetail>(OrderDetail, {
      product: "water pen",
      quantity: 5,
      price: 1,
    }),
  ];
  // save the parent entity which triggers 1 delete, 1 update, 1 insert
  await orderRepo.save(existing);
  console.log("After save...", [existing]);
  const orderFromDB = await orderRepo.findOne(findCondition);
  console.log("Dump from DB: ", orderFromDB);
};
