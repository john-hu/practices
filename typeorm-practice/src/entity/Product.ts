import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

// Define Category entity first
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @ManyToMany(() => Product)
  products: Product[];
}

// Define Product entity after Category to avoid forward reference issues
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
