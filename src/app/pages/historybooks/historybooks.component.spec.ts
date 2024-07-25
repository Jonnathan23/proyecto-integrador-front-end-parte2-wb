import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorybooksComponent } from './historybooks.component';

describe('HistorybooksComponent', () => {
  let component: HistorybooksComponent;
  let fixture: ComponentFixture<HistorybooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorybooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorybooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
