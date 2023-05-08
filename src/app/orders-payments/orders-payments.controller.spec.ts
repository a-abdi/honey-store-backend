import { Test, TestingModule } from '@nestjs/testing';
import { OrdersPaymentsController } from './orders-payments.controller';
import { OrdersPaymentsService } from './orders-payments.service';

describe('OrdersPaymentsController', () => {
  let controller: OrdersPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersPaymentsController],
      providers: [OrdersPaymentsService],
    }).compile();

    controller = module.get<OrdersPaymentsController>(OrdersPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
