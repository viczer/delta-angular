import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicItemComponent } from './academic-item.component';

describe('AcademicItemComponent', () => {
  let component: AcademicItemComponent;
  let fixture: ComponentFixture<AcademicItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
