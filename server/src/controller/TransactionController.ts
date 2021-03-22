import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Transaction} from "../entity/Transaction";
import {Customer} from "../entity/Customer";

export class TransactionController {

    private transactionRepository = getRepository(Transaction);
    private customerRepository = getRepository(Customer);

    async all(request: Request, response: Response, next: NextFunction) {
        let transactions = await this.transactionRepository.find(({ relations: ["customer"] }));

        return transactions;

    } 

    async create(request: Request, response: Response, next: NextFunction) {
        const customer = await this.customerRepository.find({
            where: {
              id: request.body.customerId
            },
          });
          if(!customer.length) {
            throw Error('customer does not exists');
        }
        const result = await this.transactionRepository.save(request.body);
        result.customer = customer;

        return result;
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;
        const data = request.body;
        let transactionToUpdate = await this.transactionRepository.findOne(id);

        if(!transactionToUpdate)
        {
            throw Error('transaction does not exists');
        }
        else{
            await this.transactionRepository.update(id,data);
            return request.params.id;  
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let transactionToRemove = await this.transactionRepository.findOne(request.params.id);
        if(!transactionToRemove)
        {
            throw Error('transaction does not exists');
        }
        else{
            await this.transactionRepository.remove(transactionToRemove);
            return request.params.id;  
        }
    }

}