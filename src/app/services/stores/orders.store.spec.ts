import { TestBed } from '@angular/core/testing';

import { OrdersStore } from './orders.store';

describe('OrdersStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    expect(service).toBeTruthy();
  });
});
