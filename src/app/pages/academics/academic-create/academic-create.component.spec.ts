import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicCreateComponent } from './academic-create.component';

describe('AcademicCreateComponent', () => {
  let component: AcademicCreateComponent;
  let fixture: ComponentFixture<AcademicCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
