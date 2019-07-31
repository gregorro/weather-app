import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDaysComponent } from './five-days.component';

describe('FiveDaysComponent', () => {
  let component: FiveDaysComponent;
  let fixture: ComponentFixture<FiveDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
