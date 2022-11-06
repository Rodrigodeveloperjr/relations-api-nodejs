import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { v4 as uuid } from "uuid"


@Entity('plan')
class Plan {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    provider: string

    @Column()
    plan_name: string
    
    @Column({ type: 'integer' })
    monthly_payment: number
    
    @Column()
    signature_date: string
    
    constructor() {

        if(!this.id) {

            this.id = uuid()
        }
    }
}

export { Plan }
