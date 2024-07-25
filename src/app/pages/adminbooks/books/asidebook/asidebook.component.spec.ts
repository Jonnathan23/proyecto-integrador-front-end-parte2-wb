import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidebookComponent } from './asidebook.component';

describe('AsidebookComponent', () => {
  let component: AsidebookComponent;
  let fixture: ComponentFixture<AsidebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsidebookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsidebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
