import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkrComponent } from './ukr.component';

describe('UkrComponent', () => {
  let component: UkrComponent;
  let fixture: ComponentFixture<UkrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UkrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
