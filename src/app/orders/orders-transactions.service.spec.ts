import { Test, TestingModule } from '@nestjs/testing';
import { OrdersTransactionsService } from './orders-transactions.service';

describe('OrdersService', () => {
  let service: OrdersTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersTransactionsService],
    }).compile();

    service = module.get<OrdersTransactionsService>(OrdersTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
