import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users";

@Entity("cards")
class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cardName: string;

  @Column({ length: 20 })
  cardNumber: string;

  @Column({ length: 5 })
  expirationDate: string;

  @Column()
  cvc: number;

  @Column()
  func?: string;

  @Column({ default: false })
  isBlocked: boolean;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}

export { Card };
