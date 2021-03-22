import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    gender: string;

    @Column()
    email: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    phone: string;

    @OneToMany(() => Transaction, (transaction) => transaction.customerId)
    public transactions: Transaction[];

}
