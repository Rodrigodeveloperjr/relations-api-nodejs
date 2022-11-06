import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from "uuid"


@Entity('address')
class Address {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    country: string

    @Column()
    state: string
    
    @Column()
    city: string
    
    @Column()
    district: string
    
    @Column()
    road: string
    
    @Column()
    number: number
    
    @Column()
    complement?: string

    @Column()
    zip_code: number

    constructor() {

        if(!this.id) {

            this.id = uuid()
        }
    }
}

export { Address }
