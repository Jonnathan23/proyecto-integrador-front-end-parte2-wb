import { TestBed } from '@angular/core/testing';

import { LendbookhistoryService } from './lendbookhistory.service';

describe('LendbookhistoryService', () => {
  let service: LendbookhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LendbookhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
