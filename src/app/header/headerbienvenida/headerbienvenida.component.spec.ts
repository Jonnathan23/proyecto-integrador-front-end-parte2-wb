import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderbienvenidaComponent } from './headerbienvenida.component';

describe('HeaderbienvenidaComponent', () => {
  let component: HeaderbienvenidaComponent;
  let fixture: ComponentFixture<HeaderbienvenidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderbienvenidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderbienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
