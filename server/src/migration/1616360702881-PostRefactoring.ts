import { MigrationInterface, QueryRunner } from "typeorm";
import { Customer } from '../entity/Customer';
import { Transaction } from '../entity/Transaction';
import * as TransactionsData from './resources/data.json';

export class PostRefactoring1616360702880 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        const customersRepository = queryRunner.connection.getRepository(Customer);
        const transactionRepository = queryRunner.connection.getRepository(Transaction);
        const customers = TransactionsData.slice(0,100).map(
            ({ first_name, last_name, email, country, city,phone, street, gender}) => (
                {
                    firstName: first_name,
                    lastName: last_name,
                    email,
                    country,
                    city,
                    street,
                    gender,
                    phone
                } 
            )
        );
        const transactions = TransactionsData.slice(0,100).map(
            ({ cerdit_card_number, cerdit_card_type, currency, customer_id, total_price}, idx) => (
                {
                    customerId: idx+1,
                    creditCardType: cerdit_card_type,
                    creditCardNumber: cerdit_card_number,
                    currency,
                    totalPrice: Number(total_price)
                } 
            )
        );
        await customersRepository.insert(customers);
        await transactionRepository.insert(transactions);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
