import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendsbooksComponent } from './lendsbooks.component';

describe('LendsbooksComponent', () => {
  let component: LendsbooksComponent;
  let fixture: ComponentFixture<LendsbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LendsbooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LendsbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
