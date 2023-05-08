import { Test, TestingModule } from '@nestjs/testing';
import { OrdersPaymentsService } from './orders-payments.service';

describe('OrdersService', () => {
  let service: OrdersPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersPaymentsService],
    }).compile();

    service = module.get<OrdersPaymentsService>(OrdersPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
