import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];
  private currentId = 1;

  create(createTransactionDto: CreateTransactionDto): Transaction {
    const newTransaction: Transaction = {
      id: this.currentId++,
      ...createTransactionDto,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  findAll(): Transaction[] {
    return this.transactions;
  }

  findOne(id: number): Transaction {
    const transaction = this.transactions.find((t) => t.id === id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto): Transaction {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Transaction not found');
    }
    this.transactions[index] = { ...this.transactions[index], ...updateTransactionDto };
    return this.transactions[index];
  }

  remove(id: number): void {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Transaction not found');
    }
    this.transactions.splice(index, 1);
  }
}
