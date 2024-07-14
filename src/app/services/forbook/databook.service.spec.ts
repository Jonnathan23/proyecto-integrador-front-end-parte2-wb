import { TestBed } from '@angular/core/testing';

import { DatabookService } from './databook.service';

describe('DatabookService', () => {
  let service: DatabookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
