import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeChartComponent } from './change-chart.component';

describe('ChangeChartComponent', () => {
  let component: ChangeChartComponent;
  let fixture: ComponentFixture<ChangeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
