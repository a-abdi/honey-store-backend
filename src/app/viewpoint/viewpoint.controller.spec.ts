import { Test, TestingModule } from '@nestjs/testing';
import { ViewpointController } from './viewpoint.controller';
import { ViewpointService } from './viewpoint.service';

describe('ViewpointController', () => {
  let controller: ViewpointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewpointController],
      providers: [ViewpointService],
    }).compile();

    controller = module.get<ViewpointController>(ViewpointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
