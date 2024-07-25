import { TestBed } from '@angular/core/testing';

import { ReturnbookhistoryService } from './returnbookhistory.service';

describe('ReturnbookhistoryService', () => {
  let service: ReturnbookhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnbookhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
