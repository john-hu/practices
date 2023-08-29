import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderName: string;

  @Column()
  buyer: string;

  @OneToMany(() => OrderDetail, (detail) => detail.order, {
    cascade: true,
    eager: true,
  })
  details: OrderDetail[];
}

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column()
  quantity: number;

  @Column("double precision")
  price: number;

  @ManyToOne(() => Order, (order) => order.details, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  order!: Order;
}
