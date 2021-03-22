import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column("double precision")
    totalPrice: number;

    @Column()
    creditCardType: string;

    @Column()
    creditCardNumber: string;

    @Column()
    currency: string;

    @ManyToOne(() => Customer, (customer) => customer.id)
    public customer: Customer;
}
