import "reflect-metadata";
import { DataSource } from "typeorm";
import { Order, OrderDetail } from "./entity/Order";
import { User } from "./entity/User";
import { Product, Category } from "./entity/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: process.env.pwd,
  database: "typeormpractice",
  synchronize: true,
  logging: false,
  entities: [Order, OrderDetail, User, Product, Category],
  migrations: [],
  subscribers: [],
});
