import { TestBed } from '@angular/core/testing';

import { MybookserviceService } from './mybookservice.service';

describe('MybookserviceService', () => {
  let service: MybookserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MybookserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
