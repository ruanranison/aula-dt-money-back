import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto): Transaction {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(): Transaction[] {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Transaction {
    return this.transactionsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Transaction {
    return this.transactionsService.update(Number(id), updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.transactionsService.remove(Number(id));
  }
}
