import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  road: string;

  @Column()
  number: number;

  @Column()
  complement?: string;

  @Column()
  zipCode: number;
}

export { Address };
