import { TestBed } from '@angular/core/testing';

import { OrderFeedService } from './order-feed.service';

describe('OrderFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderFeedService = TestBed.get(OrderFeedService);
    expect(service).toBeTruthy();
  });
});
