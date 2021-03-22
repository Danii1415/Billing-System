import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Customer } from "../entity/Customer";
import { Transaction } from "../entity/Transaction";


export class CustomerController {

    private customerRepository = getRepository(Customer);
    private transactionRepository = getRepository(Transaction);


    async removeMany(ids: number[]) {
        const transactionsToRemove = await this.transactionRepository.findByIds(ids);
        if (!transactionsToRemove) {
            throw Error(`Some Entities not found, no changes applied!`);
        }
        return this.transactionRepository.remove(transactionsToRemove);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.customerRepository.find();
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const result = await this.customerRepository.save(request.body);
        return result;
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;
        const data = request.body;
        let customerToUpdate = await this.customerRepository.findOne(id);

        if (!customerToUpdate) {
            throw Error('customer does not exists');
        }
        else {
            await this.customerRepository.update(id, data);
            return request.params.id;
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;
        const customer = await this.customerRepository.find({
            where: {
                id: id
            },
        });
        if (!customer.length) {
            throw Error('customer does not exists');
        }
        else {
            let allCustomerTransactions = await this.transactionRepository.find({
                where: {
                    customerId: id
                }
            });
            const ids = allCustomerTransactions.map(transac => transac.id);
            await this.removeMany(ids);

            await this.customerRepository.remove(customer);
            return request.params.id;
        }
    }
}