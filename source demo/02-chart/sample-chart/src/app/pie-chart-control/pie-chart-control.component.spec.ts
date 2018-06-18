import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartControlComponent } from './pie-chart-control.component';

describe('PieChartControlComponent', () => {
  let component: PieChartControlComponent;
  let fixture: ComponentFixture<PieChartControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
