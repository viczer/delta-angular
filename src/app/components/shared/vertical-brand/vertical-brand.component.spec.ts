import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBrandComponent } from './vertical-brand.component';

describe('VerticalBrandComponent', () => {
  let component: VerticalBrandComponent;
  let fixture: ComponentFixture<VerticalBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
