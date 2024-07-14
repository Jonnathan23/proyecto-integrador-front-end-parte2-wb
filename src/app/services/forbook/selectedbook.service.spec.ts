import { TestBed } from '@angular/core/testing';

import { SelectedbookService } from './selectedbook.service';

describe('SelectedbookService', () => {
  let service: SelectedbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
