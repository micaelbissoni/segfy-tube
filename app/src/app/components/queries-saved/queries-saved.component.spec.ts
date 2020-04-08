import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesSavedComponent } from './queries-saved.component';

describe('QueriesSavedComponent', () => {
  let component: QueriesSavedComponent;
  let fixture: ComponentFixture<QueriesSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriesSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
