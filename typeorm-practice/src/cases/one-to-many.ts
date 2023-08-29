import { FindOneOptions, FindOptions, FindOptionsWhere, Repository } from "typeorm";
import { Order, OrderDetail } from "../entity/Order";

export const amendOneToManyRecord = async (orderRepo: Repository<Order>) => {
  console.log("Test the One to Many result...");
  console.log("Prepare data...");
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
  const existing = await orderRepo.findOne(findCondition);
  const eraser = existing.details[1];
  eraser.quantity = 99;
  console.log("Update the details to pencil(10), eraser(99), water pen(5)");
  existing.details = [
    existing.details[0],
    eraser,
    orderRepo.manager.create<OrderDetail>(OrderDetail, {
      product: "water pen",
      quantity: 5,
      price: 1,
    }),
  ];
  await orderRepo.save(existing);
  console.log("After save...", [existing]);
  const orderFromDB = await orderRepo.findOne(findCondition);
  console.log("Dump from DB: ", orderFromDB);
};
