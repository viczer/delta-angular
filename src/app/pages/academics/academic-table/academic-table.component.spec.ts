import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTableComponent } from './academic-table.component';

describe('AcademicTableComponent', () => {
  let component: AcademicTableComponent;
  let fixture: ComponentFixture<AcademicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
