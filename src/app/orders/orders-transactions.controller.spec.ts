import { Test, TestingModule } from '@nestjs/testing';
import { OrdersTransactionsController } from './orders-transactions.controller';
import { OrdersTransactionsService } from './orders-transactions.service';

describe('OrdersPaymentsController', () => {
  let controller: OrdersTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersTransactionsController],
      providers: [OrdersTransactionsService],
    }).compile();

    controller = module.get<OrdersTransactionsController>(OrdersTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
