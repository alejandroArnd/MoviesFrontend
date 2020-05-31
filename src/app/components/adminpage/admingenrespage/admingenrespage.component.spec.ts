import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingenrespageComponent } from './admingenrespage.component';

describe('AdmingenrespageComponent', () => {
  let component: AdmingenrespageComponent;
  let fixture: ComponentFixture<AdmingenrespageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmingenrespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingenrespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
