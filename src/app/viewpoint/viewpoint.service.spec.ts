import { Test, TestingModule } from '@nestjs/testing';
import { ViewpointService } from './viewpoint.service';

describe('ViewpointService', () => {
  let service: ViewpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewpointService],
    }).compile();

    service = module.get<ViewpointService>(ViewpointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
