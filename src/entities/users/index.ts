import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Product } from "../products";
import { Address } from "../address";
import { Card } from "../cards";
import { Plan } from "../plans";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @OneToOne(() => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  is_adm: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Plan, { eager: true })
  @JoinColumn()
  plan: Plan;

  @OneToMany(() => Card, (cards) => cards.user, { eager: true })
  cards: Card[];

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];
}

export { User };
