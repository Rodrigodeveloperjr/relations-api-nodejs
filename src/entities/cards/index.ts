import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users";

@Entity("cards")
class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  card_name: string;

  @Column({ length: 20 })
  card_number: string;

  @Column({ length: 5 })
  expiration_date: string;

  @Column()
  cvc: number;

  @Column()
  func?: string;

  @Column({ default: false })
  is_blocked: boolean;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}

export { Card };
