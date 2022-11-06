import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { v4 as uuid } from "uuid"


@Entity('products')
class Product {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    title: string
    
    @Column()
    description?: string
    
    @Column({ type: 'integer' })
    price: number
    
    @Column()
    categorie: string
    
    constructor() {

        if(!this.id) {

            this.id = uuid()
        }
    }
}

export { Product }
