import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column({ type: "integer" })
  price: number;

  @Column()
  category: string;
}

export { Product };
