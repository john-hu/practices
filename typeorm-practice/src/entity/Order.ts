import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";

/**
 * Sample payload: order ------- * > order detail
 */
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
    // triggers the delete when the entity was removed from the order.details.
    orphanedRowAction: "delete",
  })
  order!: Order;
}
