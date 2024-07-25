import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsbooksComponent } from './returnsbooks.component';

describe('ReturnsbooksComponent', () => {
  let component: ReturnsbooksComponent;
  let fixture: ComponentFixture<ReturnsbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnsbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnsbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
