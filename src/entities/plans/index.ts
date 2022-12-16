import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("plans")
class Plan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column()
  planName: string;

  @Column({ type: "integer" })
  monthlyPayment: number;

  @Column()
  signatureDate: string;
}

export { Plan };
