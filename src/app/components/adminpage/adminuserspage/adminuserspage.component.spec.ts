import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserspageComponent } from './adminuserspage.component';

describe('AdminuserspageComponent', () => {
  let component: AdminuserspageComponent;
  let fixture: ComponentFixture<AdminuserspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminuserspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
